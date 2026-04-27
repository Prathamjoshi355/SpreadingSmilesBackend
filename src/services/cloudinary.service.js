import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload to specific folder
export const uploadToCloudinary = async (filePath, folder = 'spreading_smiling') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,  // यह folder create होगा automatically
      resource_type: 'auto'
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      folder: folder
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Upload Blog Image
export const uploadBlogImage = async (filePath) => {
  return uploadToCloudinary(filePath, 'spreading_smiling/blogs');
};

// Upload Gallery Image
export const uploadGalleryImage = async (filePath) => {
  return uploadToCloudinary(filePath, 'spreading_smiling/gallery');
};

// Upload Activity Image
export const uploadActivityImage = async (filePath) => {
  return uploadToCloudinary(filePath, 'spreading_smiling/activities');
};

// Delete from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      message: 'Image deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Get folder contents
export const getFolderContents = async (folderPath) => {
  try {
    const resources = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 100
    });

    return {
      success: true,
      resources: resources.resources,
      count: resources.resources.length
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};
