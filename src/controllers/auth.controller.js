import Admin from '../models/Admin.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Create token
    const token = generateToken(admin._id, 'admin');

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Register admin (first time only - remove this after initial setup)
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { email, password, adminSecret } = req.body;

    // Validate
    if (!email || !password || !adminSecret) {
      return res.status(400).json({ success: false, message: 'Please provide email, password, and admin secret' });
    }

    if (!process.env.ADMIN_SECRET || adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ success: false, message: 'Invalid admin secret' });
    }

    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    admin = await Admin.create({
      email,
      password
    });

    const token = generateToken(admin._id, 'admin');

    res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);

    res.status(200).json({
      success: true,
      admin
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
