import express from 'express';
import {
  uploadImage,
  getAllImages,
  getImagesByCategory,
  deleteImage
} from '../controllers/gallery.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadGallery } from '../config/multer.js';

const router = express.Router();

router.get('/', getAllImages);
router.get('/category/:category', getImagesByCategory);

// Admin routes
router.post('/', protect, adminOnly, uploadGallery.single('image'), uploadImage);
router.delete('/:id', protect, adminOnly, deleteImage);

export default router;
