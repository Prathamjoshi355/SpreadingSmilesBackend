import express from 'express';
import { getImpactStats, updateImpactStats } from '../controllers/impact.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getImpactStats);
router.put('/', protect, adminOnly, updateImpactStats);

export default router;
