import { Request, Response, NextFunction } from 'express';
import { UserAttr } from './user.interface';

export type AdminAuthTokenAttr = {
  id: string;
  email: string;
  roleId: string;
  permissions?: string[];
  created: Date | string | number;
  exp: number;
  iat: number;
};

export interface AdminRequestAttr extends Request {
  AdminAuthTokenAttr?: AdminAuthTokenAttr;
  admin?: AdminAuthTokenAttr;
}

export type UserAuthTokenAttr = {
  /** userId */
  id: string;
  created: Date | string | number;
  exp: number;
  iat: number;
};

export interface RequestAttr extends Request {
  UserAuthTokenAttr?: UserAuthTokenAttr;
  user?: UserAttr;
}

export type { Response, NextFunction };
