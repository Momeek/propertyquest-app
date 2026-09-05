import { sequelizeConn, DataTypes } from '../config/database';
import {
  AddressInstance,
  CityInstance,
  StateInstance,
} from '../interfaces/address.interface';

export const State = sequelizeConn.define<StateInstance>(
  'State',
  {
    stateId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    stateName: DataTypes.STRING(50),
    country: DataTypes.STRING(50),
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
  },
);

export const City = sequelizeConn.define<CityInstance>(
  'City',
  {
    cityId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    stateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'State',
        key: 'stateId',
      },
    },
    cityName: DataTypes.STRING(100),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    freezeTableName: true,
  },
);

export const Address = sequelizeConn.define<AddressInstance>(
  'Address',
  {
    addressId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    stateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'State', key: 'stateId' },
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'City', key: 'cityId' },
    },
    street: DataTypes.STRING,
    houseNumber: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  },
);
