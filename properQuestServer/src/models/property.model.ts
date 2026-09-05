import { sequelizeConn, DataTypes } from '../config/database';
import { PropertyInstance, MessageInstance, LikedPropertyInstance } from '../interfaces/property.interface';

export const Property = sequelizeConn.define<PropertyInstance>(
  'Property',
  {
    propertyId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    active: DataTypes.BOOLEAN,
    reviewNote: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    media: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    pricing: {
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
    deletedAt: { 
      type: DataTypes.DATE, 
      defaultValue: null 
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  }
);

export const Message = sequelizeConn.define<MessageInstance>(
  'Message',
  {
    messageId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    agentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Property',
        key: 'propertyId'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    deletedAt: { 
      type: DataTypes.DATE, 
      defaultValue: null 
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  }
);

export const LikedProperty = sequelizeConn.define<LikedPropertyInstance>(
  'LikedProperty',
  {
    likeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Property',
        key: 'propertyId'
      }
    },
    liked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
    deletedAt: { 
      type: DataTypes.DATE, 
      defaultValue: null 
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  }
);