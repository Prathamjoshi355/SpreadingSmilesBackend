import express from 'express';
import { getTickerItems, updateTickerItems } from '../controllers/ticker.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getTickerItems);
router.put('/', protect, adminOnly, updateTickerItems);

export default router;
