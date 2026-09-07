import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const parseBoolean = (value: string | undefined, defaultValue: boolean) =>
  value === undefined ? defaultValue : value.toLowerCase() === 'true';

const dbPort = Number(process.env.DB_PORT || 3306);
const useSsl = parseBoolean(process.env.DB_SSL, false);

const devPool = {
  max: 3,
  min: 1,
  idle: 5,
};

const prodPool = {
  max: 10,
  min: 2,
  acquire: 30000,
  idle: 10000,
};

const isProd = process.env.NODE_ENV === 'production';

const sequelizeConn = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  port: dbPort,
  logging: parseBoolean(process.env.DB_LOGGING, false),
  host: process.env.DB_HOST,
  pool: isProd ? prodPool : devPool,
  ...(useSsl && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: parseBoolean(process.env.DB_SSL_REJECT_UNAUTHORIZED, true),
      },
    },
  }),
});

const sequelizeTr = async () => await sequelizeConn.transaction();

export { sequelizeConn, DataTypes, sequelizeTr };
