import express from 'express';
import {
  createOrder,
  verifyPayment,
  getAllDonations,
  getDonationStats,
  updateDonation
} from '../controllers/donation.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

// Admin routes
router.get('/', protect, adminOnly, getAllDonations);
router.get('/stats', protect, adminOnly, getDonationStats);
router.put('/:id', protect, adminOnly, updateDonation);

export default router;
