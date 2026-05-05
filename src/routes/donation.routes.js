import express from 'express';
import {
  createOrder,
  verifyPayment,
  createBankTransferDonation,
  createManualDonation,
  getAllDonations,
  getDonationStats,
  updateDonation
} from '../controllers/donation.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.post('/bank-transfer', createBankTransferDonation);

// Admin routes
router.post('/manual', protect, adminOnly, createManualDonation);
router.get('/', protect, adminOnly, getAllDonations);
router.get('/stats', protect, adminOnly, getDonationStats);
router.put('/:id', protect, adminOnly, updateDonation);

export default router;
