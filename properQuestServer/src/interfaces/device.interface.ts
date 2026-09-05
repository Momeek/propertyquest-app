import { Model } from 'sequelize';

export interface DeviceAttr {
  deviceId?: string;
  deviceName?: string;
  deviceType?: string;
  deviceInfo?: string;
  deviceUniqueId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface DeviceInstance extends Model<DeviceAttr>, DeviceAttr {}
