import Volunteer from '../models/Volunteer.js';
import { sendVolunteerNotification } from '../services/email.service.js';

const normalizeInterests = (interest) => {
  const values = Array.isArray(interest) ? interest : [interest];
  const allowed = new Set(['education', 'health', 'environment', 'community', 'disaster-relief', 'fundraising', 'other']);

  const normalized = values
    .filter(Boolean)
    .map((value) => String(value).trim().toLowerCase())
    .map((value) => {
      if (allowed.has(value)) return value;
      if (value.includes('health') || value.includes('medical')) return 'health';
      if (value.includes('educat') || value.includes('teach')) return 'education';
      if (value.includes('environment')) return 'environment';
      if (value.includes('community')) return 'community';
      if (value.includes('disaster')) return 'disaster-relief';
      if (value.includes('fund')) return 'fundraising';
      return 'other';
    });

  return [...new Set(normalized)];
};

// @desc    Register volunteer (from frontend)
// @route   POST /api/volunteer
// @access  Public
export const registerVolunteer = async (req, res, next) => {
  try {
    const { name, email, phone, interest, message, availability } = req.body;
    const interests = normalizeInterests(interest);

    if (!name || !email || !phone || interests.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      interest: interests,
      message,
      availability: availability || 'anytime',
      status: 'new'
    });

    let emailNotification = { skipped: true };
    try {
      emailNotification = await sendVolunteerNotification(volunteer);
    } catch (emailError) {
      console.error('Volunteer email notification failed:', {
        volunteerId: volunteer._id,
        message: emailError.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Volunteer registered successfully',
      data: volunteer,
      emailNotification
    });
  } catch (error) {
    console.error('Volunteer registration failed:', {
      message: error.message,
      name: error.name,
      code: error.code,
      body: {
        hasName: Boolean(req.body?.name),
        hasEmail: Boolean(req.body?.email),
        hasPhone: Boolean(req.body?.phone),
        hasInterest: Boolean(req.body?.interest)
      }
    });
    next(error);
  }
};

// @desc    Get all volunteers (Admin only)
// @route   GET /api/volunteer
// @access  Private/Admin
export const getAllVolunteers = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: volunteers.length, data: volunteers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get volunteer statistics
// @route   GET /api/volunteer/stats
// @access  Private/Admin
export const getVolunteerStats = async (req, res, next) => {
  try {
    const total = await Volunteer.countDocuments();
    const active = await Volunteer.countDocuments({ status: 'active' });
    const new_requests = await Volunteer.countDocuments({ status: 'new' });

    res.status(200).json({
      success: true,
      stats: {
        totalVolunteers: total,
        activeVolunteers: active,
        newRequests: new_requests
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update volunteer status
// @route   PUT /api/volunteer/:id
// @access  Private/Admin
export const updateVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete volunteer
// @route   DELETE /api/volunteer/:id
// @access  Private/Admin
export const deleteVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    res.status(200).json({ success: true, message: 'Volunteer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
