import Activity from '../models/Activity.js';

// @desc    Create activity
// @route   POST /api/activity
// @access  Private/Admin
export const createActivity = async (req, res, next) => {
  try {
    const { title, description, category, date, location, volunteers } = req.body;

    // Get images from Multer
    const images = req.files ? req.files.map(file => file.path) : [];

    if (!title || !description || !date) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const activity = await Activity.create({
      title,
      description,
      category: category || 'other',
      images,
      date,
      location,
      volunteers: volunteers || 0
    });

    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all activities
// @route   GET /api/activity
// @access  Public
export const getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });

    res.status(200).json({ success: true, count: activities.length, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get activity by ID
// @route   GET /api/activity/:id
// @access  Public
export const getActivityById = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update activity
// @route   PUT /api/activity/:id
// @access  Private/Admin
export const updateActivity = async (req, res, next) => {
  try {
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    // Update with new images if provided
    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path);
    }

    activity = await Activity.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete activity
// @route   DELETE /api/activity/:id
// @access  Private/Admin
export const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    res.status(200).json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
