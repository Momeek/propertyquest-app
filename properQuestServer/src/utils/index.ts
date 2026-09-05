import { verify, sign } from 'jsonwebtoken';
import {
  AdminAuthTokenAttr,
  UserAuthTokenAttr,
} from '../interfaces/req.interface';

export function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

export const AdminToken = {
  sign: (data: { id: string; email: string }): string => {
    const token = sign(data, String(process.env.ADMIN_SECRET_KEY), {
      expiresIn: '1d',
    });

    return token;
  },

  verify: (token: string): AdminAuthTokenAttr => {
    const decoded = verify(
      token,
      String(process.env.ADMIN_SECRET_KEY),
    ) as AdminAuthTokenAttr;

    return decoded;
  },
};

export const UserToken = {
  sign: (data: { id: string }): string => {
    const token = sign(data, String(process.env.JWT_SECRET), {
      expiresIn: '1d',
    });

    return token;
  },

  verify: (token: string): UserAuthTokenAttr => {
    const decoded = verify(
      token,
      String(process.env.JWT_SECRET),
    ) as UserAuthTokenAttr;

    return decoded;
  },
};

export const getResponseMeta = (args: {
  page: number;
  count: number;
  limit: number;
}) => ({
  count: args.count,
  page: args.page,
  perPage: args.limit,
  totalPages: Math.ceil(args.count / args.limit),
});

export const formatAmount = (amount: number | string) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'symbol',
  }).format(Number(amount));
};

export const JSONSafeParse = (data: any): Record<string, any> => {
  if (!data) {
    return {};
  }

  if (typeof data === 'object') {
    return data;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('[logger]: Error parsing code', error, data);
    return {};
  }
};

export enum ErrorCodes {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_VERIFICATION_CODE = 'INVALID_VERIFICATION_CODE',
  VERIFICATION_CODE_EXPIRED = 'VERIFICATION_CODE_EXPIRED',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  SAME_PASSWORD = 'SAME_PASSWORD',
  EMAIL_ALREADY_VERIFIED = 'EMAIL_ALREADY_VERIFIED',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
  INVALID_DOCUMENT_TYPE = 'INVALID_DOCUMENT_TYPE',
  INVALID_DOCUMENT = 'INVALID_DOCUMENT',
  DOCUMENT_ALREADY_EXISTS = 'DOCUMENT_ALREADY_EXISTS',
  PROPERTY_NOT_FOUND = 'PROPERTY_NOT_FOUND'
}
