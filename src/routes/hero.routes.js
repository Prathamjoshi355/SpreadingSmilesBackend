import express from 'express';
import { getHeroSlides, updateHeroSlides } from '../controllers/hero.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getHeroSlides);
router.put('/', protect, adminOnly, updateHeroSlides);

export default router;
