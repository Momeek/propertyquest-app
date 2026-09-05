import { sequelizeConn, DataTypes } from '../config/database';
import bcrypt from 'bcryptjs';
import {
  UserInstance,
  UserPasswordInstance,
  UserDocumentInstance,
} from '../interfaces/user.interface';

export const User = sequelizeConn.define<UserInstance>(
  'User',
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      set(val: string) {
        val && this.setDataValue('email', val.toLowerCase());
      },
      validate: {
        isEmail: { msg: 'Invalid email address' },
      },
    },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    phone: DataTypes.STRING,
    dateOfbirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(
        'admin',
        'user',
        'developer',
        'property_manager',
        'landlord',
        'agent/broker',
        'agency',
      ),
      defaultValue: 'user',
    },
    type: {
      type: DataTypes.ENUM('google', 'facebook', 'apple', 'local'),
      defaultValue: 'local',
    },
    verificationCode: DataTypes.STRING,
    verificationCodeExpiry: DataTypes.DATE,
    resetPasswordCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordCodeExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    active: DataTypes.BOOLEAN,
    lastLogin: DataTypes.DATE,
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    professionalInfo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    socialMedia: {
      type: DataTypes.JSON,
      allowNull: true,
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
    timestamps: true,
  },
);

export const UserDocument = sequelizeConn.define<UserDocumentInstance>(
  'UserDocument',
  {
    userDocumentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'User', key: 'userId' },
    },
    cacNumber: DataTypes.STRING,
    nin: DataTypes.STRING,
    businessDocumentUrl: DataTypes.STRING,
    isAffiliated: DataTypes.BOOLEAN,
    affiliationDocumentUrl: DataTypes.STRING,
    inReview: DataTypes.BOOLEAN,
    rejected: DataTypes.BOOLEAN,
    role: {
      type: DataTypes.ENUM(
        'admin',
        'user',
        'developer',
        'property_manager',
        'landlord',
        'agent/broker',
        'agency',
      ),
      defaultValue: 'user',
    },
    docType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reviewNote: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    timestamps: true,
  },
);

export const UserPassword = sequelizeConn.define<UserPasswordInstance>(
  'UserPassword',
  {
    userPasswordId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'User', key: 'userId' },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val: string) {
        this.setDataValue('password', bcrypt.hashSync(val, 10));
      },
    },
    secret: DataTypes.STRING,
    resetToken: DataTypes.STRING,
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
    timestamps: true,
  },
);

(UserPassword.prototype as any).comparePassword = function (
  password: string,
): boolean {
  return bcrypt.compareSync(password, this.password || '');
};
