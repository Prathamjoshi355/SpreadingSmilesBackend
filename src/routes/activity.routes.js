import express from 'express';
import {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity
} from '../controllers/activity.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadActivity } from '../config/multer.js';

const router = express.Router();

router.get('/', getAllActivities);
router.get('/:id', getActivityById);

// Admin routes
router.post('/', protect, adminOnly, uploadActivity.array('images', 5), createActivity);
router.put('/:id', protect, adminOnly, uploadActivity.array('images', 5), updateActivity);
router.delete('/:id', protect, adminOnly, deleteActivity);

export default router;
