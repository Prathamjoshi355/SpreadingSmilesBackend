import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage for Blogs
const blogStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'spreading_smiling/blogs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    resource_type: 'auto'
  }
});

// Storage for Gallery
const galleryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'spreading_smiling/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    resource_type: 'auto'
  }
});

// Storage for Activities
const activityStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'spreading_smiling/activities',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    resource_type: 'auto'
  }
});

// Multer instances for different folders
export const uploadBlog = multer({ storage: blogStorage });
export const uploadGallery = multer({ storage: galleryStorage });
export const uploadActivity = multer({ storage: activityStorage });
