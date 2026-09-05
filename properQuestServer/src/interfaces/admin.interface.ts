import { Model } from "sequelize";
import { z } from 'zod';

export interface AdminAttr {
  adminId?: string;
  userName?: string;
  fullName?: string;
  email?: string;
  isSuperAdmin?: boolean;
  password?: string;
  permissions?: string;
  active?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdminInstance extends  Model<AdminAttr>, AdminAttr {
  comparePassword(password: string): boolean;
}

export const AdminLogingSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const CreateAdminSchema = z.object({
  userName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
  isSuperAdmin: z.boolean().optional(),
  // permissions: z.array(z.string()),
});

export const UpdateAdminPermissionsSchema = z.object({
  adminId: z.string(),
  permissions: z.array(z.string()),
});
