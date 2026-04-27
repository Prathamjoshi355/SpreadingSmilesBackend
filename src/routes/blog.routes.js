import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog
} from '../controllers/blog.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadBlog } from '../config/multer.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);

// Admin routes
router.post('/', protect, adminOnly, uploadBlog.single('image'), createBlog);
router.put('/:id', protect, adminOnly, uploadBlog.single('image'), updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

export default router;
