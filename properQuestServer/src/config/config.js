// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const parseBoolean = (value, defaultValue) =>
  value === undefined ? defaultValue : value.toLowerCase() === 'true';

const databaseOptions = {
  port: Number(process.env.DB_PORT || 3306),
  dialect: 'mysql',
  ...(parseBoolean(process.env.DB_SSL, false) && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: parseBoolean(process.env.DB_SSL_REJECT_UNAUTHORIZED, true),
      },
    },
  }),
};

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    ...databaseOptions,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    ...databaseOptions,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    ...databaseOptions,
  },
};
