import express from 'express';
import * as UserController from '../controllers/profile.controllers';
import { Auth } from '../middlewares/auth';
import multer from 'multer';

const router = express.Router();
const upload = multer({ limits: { fileSize: 5242880 } });

// private routes
router.use(Auth);
router.put('/profile/me', UserController.updateProfile);
router.get('/profile/me/:userId', UserController.getProfile);
router.put('/profile/update-password', UserController.updatePassword);
router.post(
  '/profile/upload-profile-picture/:userId',
  upload.single('photo'),
  UserController.uploadProfilePicture,
);

export default router;
