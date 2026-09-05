import express from 'express';
import { validateRequest } from '../../utils/https.utils';
import * as AdminAuthController from '../controllers/admin.controllers';
import { AdminLogingSchema, CreateAdminSchema } from '../../interfaces/admin.interface';
import { AdminAuth } from '../middlewares/admin';
import { where } from 'sequelize/types';

const router = express.Router();

router.post(
  '/admin/create',
  validateRequest(CreateAdminSchema),
  AdminAuthController.createAdmin,
);

router.post(
  '/admin/auth/login',
  validateRequest(AdminLogingSchema),
  AdminAuthController.loginAdmin,
);

router.get('/admin/all/:adminId', AdminAuth, AdminAuthController.getAllAdmins);

router.get('/admin/single/:adminId', AdminAuth, AdminAuthController.getSingleAdmin);

router.get('/admin/users/all', AdminAuth, AdminAuthController.getAllUsers);

router.get('/admin/users/:userId', AdminAuth, AdminAuthController.getSingleUser);

router.get('/admin/user-docs/all', AdminAuth, AdminAuthController.getAllUsersDoc);

router.get('/admin/user-docs/:userId', AdminAuth, AdminAuthController.getSingleUserDoc);

router.post('/admin/user-docs/:docId/reject', AdminAuth, AdminAuthController.rejectUserDoc);

router.post('/admin/user-docs/:docId/approve', AdminAuth, AdminAuthController.approveUserDoc);

router.post('/admin/user-docs/:docId/note', AdminAuth, AdminAuthController.reviewUserDocNote);

router.post('/admin/auth/reset-password', AdminAuthController.resetPassword);

router.put('/admin/diactivate-user/:userId', AdminAuth, AdminAuthController.deactivateUser);

router.put('/admin/activate-user/:userId', AdminAuth, AdminAuthController.activateUser);

router.put('/admin/diactivate-admin/:adminId', AdminAuth, AdminAuthController.deactivateAdmin);

router.put('/admin/activate-admin/:adminId', AdminAuth, AdminAuthController.activateAdmin);

router.get('/admin/property/all', AdminAuth, AdminAuthController.getAllUsersProperty);

// Get all published properties
router.get('/admin/property/published', AdminAuth, AdminAuthController.getPublishedProperties);

// Get all unpublished properties
router.get('/admin/property/unpublished', AdminAuth, AdminAuthController.getUnpublishedProperties);

router.get('/admin/property/:propertyId', AdminAuth, AdminAuthController.getSingleUserProperty);

// Update published property
router.put('/admin/property/publish/:propertyId', AdminAuth, AdminAuthController.publishProperty);

// Update unpublished property
router.put('/admin/property/unpublish/:propertyId', AdminAuth, AdminAuthController.unpublishProperty);

router.put('/admin/property/note/:propertyId', AdminAuth, AdminAuthController.reviewPropertyNote);


export default router;
