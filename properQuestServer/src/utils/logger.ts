import Pino, { LoggerOptions } from 'pino';
import Pretty from 'pino-pretty';
import { enqueueTask } from './taskQueue';
import { isObject } from 'lodash';
import { LoggerModel } from '../models/logger.model';

const options: LoggerOptions<string> = {
  timestamp: Pino.stdTimeFunctions.isoTime,
};

async function recordLog(log: any) {
  return LoggerModel.create(log);
}

const stream = Pretty({
  colorize: true,
});

function consoleLogger(name: string) {
  return Pino({ ...options, name }, stream);
}

export const JSONSafeStringify = (data: any): string | null => {
  if (!data) {
    return '{}';
  }

  if (!isObject(data)) {
    if (typeof data === 'string') {
      return data;
    }

    if (data.toString) {
      return data.toString();
    }

    return '{}';
  }

  try {
    return JSON.stringify(data, null, 2);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[logger]: Error stringifying code', error, data);
  }

  if (data.toString) {
    return data.toString();
  }

  if ('length' in data) {
    return '[]';
  }

  return '{}';
};

let parseLogAttributes = (log: any) => {
  const data: Record<string, unknown> = {
    uuid: '',
    meta: '{}',
    app: 'Unknown',
    messaage: '',
  };

  if (typeof log === 'string') {
    data.message = log;
    return data;
  }

  if ('uuid' in log) {
    data.uuid = log.uuid;
  }

  if ('fatal' in log) {
    data.fatal = log.fatal;
  }

  if ('app' in log) {
    data.attention = log.attention;
  }

  data.meta = JSONSafeStringify(log);
  return data;
};

export const createLogger = (
  name: string,
  app?: 'Admin' | 'User',
) => {
  const logger = consoleLogger(name);

  function log(level: string, data: any, ...log: any) {
    const logAttributes = parseLogAttributes(data);
    logAttributes.app = app || 'Unknown';
    logAttributes.logger = name;

    if (log[0] && typeof log[0] === 'string') {
      logAttributes.message = log[0];
    }

    enqueueTask(() => recordLog({ level, ...logAttributes }));
    logger[level](data, ...log);
  }

  return {
    error: (data: any, ...rest: any) => log('error', data, ...rest),
    warn: (data: any, ...rest: any) => log('warn', data, ...rest),
    info: (data: any, ...rest: any) => log('info', data, ...rest),
    /* Log only to console */
    debug: (log: any) => logger.info(log),
  };
};
