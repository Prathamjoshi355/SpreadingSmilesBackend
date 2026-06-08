import express from 'express';
import {
  registerVolunteer,
  getAllVolunteers,
  getFeaturedVolunteers,
  getVolunteerStats,
  updateVolunteer,
  deleteVolunteer
} from '../controllers/volunteer.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { uploadVolunteer } from '../config/multer.js';

const router = express.Router();

// Public routes
router.post('/', registerVolunteer);
router.get('/featured', getFeaturedVolunteers);

// Admin routes
router.get('/', protect, adminOnly, getAllVolunteers);
router.get('/stats', protect, adminOnly, getVolunteerStats);
router.put('/:id', protect, adminOnly, uploadVolunteer.single('photo'), updateVolunteer);
router.delete('/:id', protect, adminOnly, deleteVolunteer);

export default router;
