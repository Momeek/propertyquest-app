import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import helmetCsp from 'helmet-csp';
import { flow } from 'lodash';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { send, status, sendError } from './utils/https.utils';
import { z } from 'zod';
import AuthRouter from './api/routes';
import { FOLDER_PATHS } from './api/utils';
import session from 'express-session';
import passport from './config/passport';
import { baseUrl, base2Url } from './utils/baseUrl';
import { createLogger } from './utils/logger';
import { ErrorCodes, getResponseMeta } from './utils';
import { LikedProperty, Property, User } from './models';
import { WhereOptions } from 'sequelize/types';
import { Op } from 'sequelize';
import { sequelizeConn } from './config/database';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'PropertyQuest API',
      version: '1.0.0',
      description: 'PropertyQuest API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const app = express();
app.set('trust proxy', 1);

export const EnvSchema = z.object({
  PORT: z.string().optional(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_SSL: z.enum(['true', 'false']).default('false'),
  DB_SSL_REJECT_UNAUTHORIZED: z.enum(['true', 'false']).default('true'),
  DATABASE_URL: z.string().optional(),

  NODE_ENV: z.string().default('development'),

  JWT_SECRET: z.string().optional(),

  // ADMIN
  ADMIN_SECRET_KEY: z.string(),
  ADMIN_EMAIL: z.string(),
  ADMIN_PASSWORD: z.string(),
});

const cspConfig = {
  directives: {
    defaultSrc: ['self'],
    scriptSrc: ['self', 'unsafe-inline'],
    styleSrc: ['self', 'unsafe-inline'],
  },
};

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Swagger TODO:
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

//App Setup
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmetCsp(cspConfig));
app.use(apiLimiter);
app.use(express.json());
// Debug: confirm whether the signup request reaches the backend
app.use((req, _res, next) => {
  console.log("BACKEND HIT:", req.method, req.originalUrl);
  next();
});
app.use('/api', AuthRouter);
app.use(
  '/assets/businessFiles',
  express.static(FOLDER_PATHS.bussinessdocuments),
);
app.use(
  '/assets/affiliationFiles',
  express.static(FOLDER_PATHS.affiliationdocuments),
);
app.use('/assets/avatar', express.static(FOLDER_PATHS.avatars));
app.use('/assets/propertyimages', express.static(FOLDER_PATHS.propertyimages));
app.use('/assets/propertyfloorimages', express.static(FOLDER_PATHS.propertyfloorimages));

//Logging
app.use(morgan('dev'));

app.get('/', (_, res) => {
  res.json({
    message: 'PropertyQuest API v1.0',
    frontendUrl: baseUrl,
    backendUrl: base2Url,
  });
});

app.get('/status/', async (_, res) => {
  res.send('ok');
});

app.use('/api/properties', async (req, res) => {
  const logger = createLogger('GetAllProperty', 'User');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const listingType = req.query.listingType as string;
  const title = req.query.title as string;
  const propertyType = req.query.propertyType as string;

  let whereClause: WhereOptions = {};
  const conditions: any[] = [];

  if (listingType) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.listingType'))`),
        listingType
      )
    );
  }

  if (title) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.title'))`),
        { [Op.like]: `%${title}%` }
      )
    );
  }

  if (propertyType) {
    conditions.push(
      sequelizeConn.where(
        sequelizeConn.literal(`JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(details), '$.propertyType'))`),
        propertyType
      )
    );
  }

  // Only add AND clause if there are conditions
  if (conditions.length > 0) {
    whereClause = {
      [Op.and]: conditions
    };
  }

  try {
    const { rows: properties, count } = await Property.findAndCountAll({
      where: { active: true, ...whereClause },
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: User,
          foreignKey: "userId",
          attributes: [
            'name',
            'surname',
            'phone',
            'avatarUrl',
            'email',
            'professionalInfo',
            'createdAt',
          ]
        },
        {
          model: LikedProperty,
          foreignKey: "propertyId",
        }
      ]
    });

    if (!properties || properties.length === 0) {
      return flow(
        status(200),
        send('No properties found matching the criteria', {
          properties: [],
          meta: getResponseMeta({
            count: 0,
            page,
            limit,
          }),
        }),
      )(res);
    }

    return flow(
      status(200),
      send('Properties retrieved successfully', {
        properties,
        meta: getResponseMeta({
          count,
          page,
          limit,
        }),
      }),
    )(res);
  } catch (error) {
    logger.error(
      { error },
      'Failed to fetch all properties'
    );

    return flow(
      status(500),
      sendError('Error fetching all properties', {
        message: (error as Error).message,
      }),
    )(res);
  }
});

app.use('/api/property/:propertyId', async (req, res) => {
  const logger = createLogger('GetPropertyById', 'User');
  try {
    // Find users properties by id.
    const { propertyId } = req.params;

    const property = await Property.findOne({
      where: { propertyId },
      include: [
        {
          model: User,
          foreignKey: "userId",
          attributes: [
            'name',
            'userId',
            'surname',
            'phone',
            'avatarUrl',
            'email',
            'professionalInfo',
            'createdAt',
          ]
        },
        {
          model: LikedProperty,
          foreignKey: "propertyId",
        }
      ]
    });

    if (!property) {
      return flow(
        status(404),
        sendError('Property not found', {
          code: ErrorCodes.PROPERTY_NOT_FOUND
        }),
      )(res);
    }


    return flow(
      status(200),
      send('Property retrieved successfully', { property }),
    )(res);
  } catch (error) {
    logger.error(
      { error },
      'Failed to fetch property'
    );

    return flow(
      status(500),
      sendError('Error fetching property', {
        message: (error as Error).message,
      }),
    )(res);
  }
});

const UnsupportedRouteHandler = (_: Request, res: Response) =>
  flow(status(400), send('Unsupported: Invalid route/method'))(res);

app.get('*', UnsupportedRouteHandler);
app.post('*', UnsupportedRouteHandler);
app.patch('*', UnsupportedRouteHandler);
app.delete('*', UnsupportedRouteHandler);
