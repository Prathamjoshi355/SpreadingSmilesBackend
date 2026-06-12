import Gallery from '../models/Gallery.js';

// @desc    Upload image to gallery
// @route   POST /api/gallery
// @access  Private/Admin
export const uploadImage = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    // Get image from Multer
    const imageUrl = req.file ? req.file.path : null;

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Please provide image' });
    }

    const image = await Gallery.create({
      imageUrl,
      title,
      description,
      category: category || 'other'
    });

    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getAllImages = async (req, res, next) => {
  try {
    const images = await Gallery.find({ visible: true }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: images.length, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all gallery images for admin
// @route   GET /api/gallery/admin
// @access  Private/Admin
export const getAllImagesAdmin = async (req, res, next) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: images.length, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateImage = async (req, res, next) => {
  try {
    const updateData = {};
    if (typeof req.body.visible === 'string') {
      updateData.visible = req.body.visible === 'true';
    } else if (typeof req.body.visible === 'boolean') {
      updateData.visible = req.body.visible;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: 'Nothing to update' });
    }

    const image = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get gallery images by category
// @route   GET /api/gallery/category/:category
// @access  Public
export const getImagesByCategory = async (req, res, next) => {
  try {
    const images = await Gallery.find({ category: req.params.category }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: images.length, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete image from gallery
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteImage = async (req, res, next) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
