import express from 'express';
import {
  uploadImage,
  getAllImages,
  getImagesByCategory,
  getImagesByActivity,
  updateImage,
  deleteImage
} from '../controllers/gallery.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadGallery } from '../config/multer.js';

const router = express.Router();

router.get('/', getAllImages);
router.get('/category/:category', getImagesByCategory);
router.get('/activity/:activityId', getImagesByActivity);

// Admin routes
router.post('/', protect, adminOnly, uploadGallery.any(), uploadImage);
router.put('/:id', protect, adminOnly, uploadGallery.single('image'), updateImage);
router.delete('/:id', protect, adminOnly, deleteImage);

export default router;
