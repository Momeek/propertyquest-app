/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    CARD_AND_SUB_AMOUNT: string;
    JWT_SECRET: string;
    STAFF_SECRET_KEY: string;
    STAFF_INVITE_SECRET: string;
    FLW_PUBLIC_KEY: string;
    FLW_SECRET_KEY: string;
    FLW_SECRET_HASH: string;
    SMS_LIVE_API_KEY: string;
  }
}
