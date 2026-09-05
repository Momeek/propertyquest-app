import { Model } from 'sequelize';

export interface LoggerEntryAttr {
  id?: string;
  uuid?: string;
  level?: 'error' | 'warn' | 'info' | 'debug';
  meta?: string;
  app?: string;
  logger?: string;
  message?: string;
  fatal?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoggerEntry
  extends Model<LoggerEntryAttr>,
    LoggerEntryAttr {}
