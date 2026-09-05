import bcrypt from 'bcryptjs';
import { sequelizeConn, DataTypes } from '../config/database';
import { AdminInstance } from '../interfaces/admin.interface'

export const Admin = sequelizeConn.define<AdminInstance>(
  'Admin',
  {
    adminId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING({ length: 100 }),
      validate: {
        isEmail: {
          msg: 'Enter a valid email',
        },
      },
    },
    isSuperAdmin: {
      type: DataTypes.BOOLEAN,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val: string) {
          this.setDataValue('password', bcrypt.hashSync(val, 10));
      },
    },
    permissions: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLogin: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    paranoid: false,
    freezeTableName: true,
  },
);

(Admin.prototype as any).comparePassword = function (
  password: string,
): boolean {
  return bcrypt.compareSync(password, this.password || '');
};
