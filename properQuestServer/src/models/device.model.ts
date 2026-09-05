import { sequelizeConn, DataTypes } from '../config/database';
import { DeviceInstance } from '../interfaces/device.interface';

export const Device = sequelizeConn.define<DeviceInstance>(
  'Device',
  {
    deviceId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    deviceName: DataTypes.STRING,
    deviceType: DataTypes.STRING,
    deviceInfo: DataTypes.STRING,
    deviceUniqueId: {
      type: DataTypes.STRING,
      unique: true,
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
    deletedAt: { type: DataTypes.DATE, defaultValue: null },
  },
  {
    freezeTableName: true,
    paranoid: true,
  },
);
