const clientDevelopmentUrl = process.env.CLIENT_LOCALHOST_URL;
const clientProductionUrl = process.env.CLIENT_PROD_URL;
export const vercelEnv = process.env.VERCEL_ENV;
// const previewUrl = process.env.PREVIEW_URL;

const serverDevelopmentUrl = process.env.SERVER_LOCALHOST_URL;
const serverProductionUrl = process.env.SERVER_PROD_URL;

export const nodeEnv = process.env.NODE_ENV;

//Environment check
export const baseUrl =
  vercelEnv === 'production' || nodeEnv === 'production'
    ? clientProductionUrl
    : clientDevelopmentUrl;

export const base2Url =
  vercelEnv === 'production' || nodeEnv === 'production'
    ? serverProductionUrl
    : serverDevelopmentUrl;
