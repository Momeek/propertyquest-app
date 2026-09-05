import { Model } from 'sequelize';
import { z } from 'zod';

export type Role =
  | 'admin'
  | 'user'
  | 'developer'
  | 'property_manager'
  | 'landlord'
  | 'agent/broker'
  | 'agency';

export interface UserAttr {
  userId?: string;
  email?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  name?: string;
  surname?: string;
  phone?: string;
  dateOfbirth?: Date;
  gender?: string;
  type?: 'google' | 'facebook' | 'apple' | 'local';
  role?: Role;
  active?: boolean;
  lastLogin?: Date;
  verificationCode?: string;
  verificationCodeExpiry?: Date;
  resetPasswordCode?: string;
  resetPasswordCodeExpiry?: Date;
  UserPassword?: UserPasswordAttr;
  professionalInfo?: {
    yearOfExperience?: number;
    licenseNumber?: string;
    company?: string;
    bio?: string;
    areasOfExpert?: {
      residential?: boolean;
      investment?: boolean;
      commercial?: boolean;
      rental?: boolean;
      luxury?: boolean;
      international?: boolean;
    };
  };
  location?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    serviceAreas?: string;
  };
  socialMedia?: {
    website?: string;
    linkedIn?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInstance extends Model<UserAttr>, UserAttr {}

export interface UserDocumentAttr {
  userDocumentId?: string;
  userId?: string;
  cacNumber?: string;
  nin?: string;
  businessDocumentUrl?: string;
  isAffiliated?: boolean;
  affiliationDocumentUrl?: string;
  inReview?: boolean;
  rejected?: boolean;
  docType?: string;
  role?: Role;
  reviewNote?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserDocumentInstance
  extends Model<UserDocumentAttr>,
    UserDocumentAttr {}

export interface UserPasswordAttr {
  userPasswordId?: string;
  userId?: string;
  password?: string;
  secret?: string;
  User?: UserAttr;
  resetToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserPasswordInstance
  extends Model<UserPasswordAttr>,
    UserPasswordAttr {
  comparePassword: (password: string) => boolean;
}

export const CreateUserSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    surname: z.string().min(1, 'Surname is required'),
    email: z.string().email(),
    phone: z.string().optional(),
    type: z
      .enum(['google', 'facebook', 'apple', 'local'], {
        message: 'Type must be google, facebook, apple or local',
      })
      .default('local'),
    role: z.enum(
      [
        'admin',
        'user',
        'developer',
        'property_manager',
        'landlord',
        'agent/broker',
        'agency',
      ],
      {
        message:
          'Role must be user, developer, property_manager, landlord, broker or agent',
      },
    ),
    nin: z.string().optional(),
    cacNumber: z.string().optional(),
    businessDocumentUrl: z.string().optional(),
    affiliationDocumentUrl: z.string().optional(),
    isAffiliated: z.boolean().optional(),
    inReview: z.boolean().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.email, {
    message: 'Email is required',
    path: ['email'],
  });

export const UserLogingSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
