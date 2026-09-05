import { Sequelize, DataTypes } from 'sequelize';
require('dotenv').config();

const dbName = `${process.env.DB_NAME}`;
const dbUserName = `${process.env.DB_USER}`;
const dbPassword = `${process.env.DB_PASS}`;

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
  username: dbUserName,
  password: dbPassword,
  database: dbName,
  dialect: 'mysql',
  port: Number(process.env.DB_PORT),
  logging: Boolean(process.env.DB_LOGGING),
  host: process.env.DB_HOST,
  pool: isProd ? prodPool : devPool,
});

const sequelizeTr = async () => await sequelizeConn.transaction();

export { sequelizeConn, DataTypes, sequelizeTr };
