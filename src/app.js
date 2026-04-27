import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.middleware.js';

// Load environment variables
dotenv.config();

// Routes
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import activityRoutes from './routes/activity.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import donationRoutes from './routes/donation.routes.js';
import volunteerRoutes from './routes/volunteer.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : [])
].filter(Boolean).map((origin) => origin.trim().replace(/\/+$/, ''));

app.use(cors({
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/+$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  }
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Spreading Smiling NGO Backend API',
    version: '1.0.0',
    endpoints: {
      api: '/api',
      health: '/api/health',
      auth: '/api/auth',
      blog: '/api/blog',
      activity: '/api/activity',
      gallery: '/api/gallery',
      donations: '/api/donations',
      volunteers: '/api/volunteer',
      analytics: '/api/analytics'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.get('/api/config', (req, res) => {
  res.status(200).json({
    API_BASE_URL: '/api'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/donate', donationRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

export default app;
