import { LoggerEntry, } from './../interfaces/logger.interface'
import { sequelizeConn, DataTypes } from '../config/database';

export const LoggerModel = sequelizeConn.define<LoggerEntry>(
  'Logger',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    level: {
      type: DataTypes.ENUM('error', 'warn', 'info', 'debug'),
      defaultValue: 'info',
    },
    meta: DataTypes.TEXT,
    message: DataTypes.TEXT,
    logger: DataTypes.STRING,
    app: {
      type: DataTypes.STRING,
      defaultValue: 'Unknown',
    },
    fatal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    paranoid: false,
    timestamps: true,
  },
)