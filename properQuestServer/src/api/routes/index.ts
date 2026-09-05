import express from 'express';
const router = express.Router();

import auth from './auth';
import adminAuth from './admin';
import profile from './profile';
import property from './property';
import morgan from 'morgan';

router.use(morgan('dev'));
router.use('/', auth);
router.use('/', adminAuth);
router.use('/', profile);
router.use('/', property);

export default router;
