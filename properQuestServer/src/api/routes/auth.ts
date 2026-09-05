import express from 'express';
import { validateRequest } from '../../utils/https.utils';
import * as AuthController from '../controllers/auth.controllers';
import { Auth } from '../middlewares/auth';
import {
  CreateUserSchema,
  UserLogingSchema,
} from '../../interfaces/user.interface';
import passport from '../../config/passport';
import { RequestAttr, Response } from '../../interfaces/req.interface';
import multer from 'multer';

const router = express.Router();
const upload = multer({ limits: { fileSize: 5242880 } });

// Public routes

router.post(
  '/create-user',
  validateRequest(CreateUserSchema),
  AuthController.createUser,
);

router.post(
  '/update-user/:userId',
  upload.fields([
    { name: 'businessDocument', maxCount: 1 },
    { name: 'affiliationDocument', maxCount: 1 },
  ]),
  Auth,
  AuthController.updateUser,
);

router.post(
  '/update-document/:userId',
  upload.fields([
    { name: 'businessDocument', maxCount: 1 },
    { name: 'affiliationDocument', maxCount: 1 },
  ]),
  Auth,
  AuthController.updateDocument,
);

router.post('/auth/verify-email', AuthController.verifyEmail);

router.post(
  '/auth/resend-verification-code',
  AuthController.resendVerificationCode,
);

router.post('/auth/check-email', AuthController.checkEmail);

router.post(
  '/auth/login',
  validateRequest(UserLogingSchema),
  AuthController.loginUser,
);

// Add social auth routes
router.get('/auth/failed', (req: RequestAttr, res: Response) => {
  res.status(401).json({
    message: 'Authentication failed',
    error: req.query.error,
  });
});

router.post('/auth/forgot-password', AuthController.forgotPassword);
router.post('/auth/reset-password', AuthController.resetPassword);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  AuthController.googleAuthCallback,
);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
);
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
);

router.get('/auth/apple', passport.authenticate('apple'));
router.post(
  '/auth/apple/callback',
  passport.authenticate('apple', {
    failureRedirect: '/login',
    successRedirect: '/auth-success',
  }),
);
// router.get('/auth-success', (req, res) => {
//   const token = req.query.token as string;
//   res.send(`Authentication successful! Token: ${token}`);
// });

// Protected routes (example)
// router.get('/me', Auth, UserController.getProfile);

export default router;
