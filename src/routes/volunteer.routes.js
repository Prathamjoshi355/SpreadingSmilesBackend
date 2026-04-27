import express from 'express';
import {
  registerVolunteer,
  getAllVolunteers,
  getVolunteerStats,
  updateVolunteer,
  deleteVolunteer
} from '../controllers/volunteer.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/', registerVolunteer);

// Admin routes
router.get('/', protect, adminOnly, getAllVolunteers);
router.get('/stats', protect, adminOnly, getVolunteerStats);
router.put('/:id', protect, adminOnly, updateVolunteer);
router.delete('/:id', protect, adminOnly, deleteVolunteer);

export default router;
