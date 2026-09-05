import http from 'http';
import { app, EnvSchema } from './app';
import { normalizePort } from './utils';
import { createLogger } from './utils/logger';
import { sequelizeConn } from './config/database';

// Set timezone
process.env.TZ = 'Africa/Lagos';

//Load configs
const logger = createLogger('Server');

//Server setup
const PORT = normalizePort(process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(PORT, async () => {
  await EnvSchema.parseAsync(process.env).catch((error) => {
    logger.error({ error }, 'Failed to parse environment variables');
    process.exit(1);
  });

  sequelizeConn
    .authenticate()
    .then(() => {
      logger.info(`Server listening on port: ${PORT}`);
    })
    .catch((error) => {
      logger.error({ error }, 'Failed to connect to database');
      process.exit(1);
    });
});
