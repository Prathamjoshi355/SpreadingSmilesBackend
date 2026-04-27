import express from 'express';
import { getAdminAnalytics } from '../controllers/analytics.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getAdminAnalytics);

export default router;
