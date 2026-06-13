import Gallery from '../models/Gallery.js';

const normalizeGalleryFiles = (req) => {
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    return req.files;
  }

  if (req.file) {
    return [req.file];
  }

  return [];
};

// @desc    Upload image to gallery
// @route   POST /api/gallery
// @access  Private/Admin
export const uploadImage = async (req, res, next) => {
  try {
    const { title, description, category, date, activityId } = req.body;
    const files = normalizeGalleryFiles(req);

    if (files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide one or more images' });
    }

    const images = await Promise.all(
      files.map((file) =>
        Gallery.create({
          imageUrl: file.path,
          title,
          description,
          category: category || 'other',
          date: date ? new Date(date) : undefined,
          activity: activityId || undefined
        })
      )
    );

    res.status(201).json({
      success: true,
      data: images.length === 1 ? images[0] : images
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getAllImages = async (req, res, next) => {
  try {
    const images = await Gallery.find().sort({ date: -1, createdAt: -1 });

    res.status(200).json({ success: true, count: images.length, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get gallery images by activity id
// @route   GET /api/gallery/activity/:activityId
// @access  Public
export const getImagesByActivity = async (req, res, next) => {
  try {
    const images = await Gallery.find({ activity: req.params.activityId }).sort({ date: -1, createdAt: -1 });

    res.status(200).json({ success: true, count: images.length, data: images });
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

// @desc    Update gallery image metadata
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateImage = async (req, res, next) => {
  try {
    const { title, description, category, date, activityId } = req.body;
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    if (req.file) {
      image.imageUrl = req.file.path;
    }

    if (title !== undefined) image.title = title;
    if (description !== undefined) image.description = description;
    if (category !== undefined) image.category = category;
    if (date !== undefined && date !== '') image.date = new Date(date);
    if (activityId !== undefined) image.activity = activityId || undefined;

    await image.save();

    res.status(200).json({ success: true, data: image });
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
