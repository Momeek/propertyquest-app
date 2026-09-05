import express from 'express';
import * as PropertyController from '../controllers/property.controller';
import { Auth } from '../middlewares/auth';
import multer from 'multer';

const router = express.Router();
const upload = multer({ limits: { fileSize: 5242880 } });

// private routes
router.use(Auth);
// router.put('/property/update', PropertyController.updateProfile);
router.get('/property/:userId', PropertyController.getUserProperty);
router.post(
  '/property/add-property/:userId',
  upload.any(),
  PropertyController.createProperty,
);
router.patch('/property/update-property/:propertyId', upload.any(), PropertyController.updateProperty);
router.delete('/property/delete-property/:propertyId', PropertyController.deleteProperty);
router.post('/property/message-agent/:agentId', PropertyController.messageAgent);

router.post('/property/liked-property', PropertyController.likedProperty);
router.get('/property/liked-property/:userId', PropertyController.getLikedProperty);
router.delete('/property/liked-property/:likedId', PropertyController.deleteLikedProperty);

export default router;
