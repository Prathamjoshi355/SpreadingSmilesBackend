import Donation from '../models/Donation.js';
import razorpayInstance from '../config/razorpay.js';
import crypto from 'crypto';

// @desc    Create Razorpay order
// @route   POST /api/donate/create-order
// @access  Public
export const createOrder = async (req, res, next) => {
  try {
    const { name, email, amount, message, isAnonymous } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and amount' });
    }

    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET ||
      process.env.RAZORPAY_KEY_ID.startsWith('your_') ||
      process.env.RAZORPAY_KEY_SECRET.startsWith('your_')
    ) {
      return res.status(500).json({ success: false, message: 'Razorpay is not configured' });
    }

    // Amount in paise (1 rupee = 100 paise)
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        name: isAnonymous ? 'Anonymous' : name,
        email: isAnonymous ? 'anonymous@ngo.com' : email,
        message: message || '',
        isAnonymous: isAnonymous || false
      }
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: amountInPaise,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify payment and save donation
// @route   POST /api/donate/verify-payment
// @access  Public
export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, amount, message, isAnonymous } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment details' });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Save donation to database
    const donation = await Donation.create({
      name: isAnonymous ? 'Anonymous' : name,
      email: isAnonymous ? 'anonymous@ngo.com' : email,
      amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: 'completed',
      message: message || '',
      isAnonymous
    });

    res.status(201).json({
      success: true,
      message: 'Payment verified and donation recorded',
      data: donation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all donations (Admin only)
// @route   GET /api/donations
// @access  Private/Admin
export const getAllDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ status: 'completed' }).sort({ createdAt: -1 });

    const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

    res.status(200).json({
      success: true,
      count: donations.length,
      totalAmount,
      data: donations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get donation statistics
// @route   GET /api/donations/stats
// @access  Private/Admin
export const getDonationStats = async (req, res, next) => {
  try {
    const total = await Donation.countDocuments({ status: 'completed' });
    const completed = await Donation.countDocuments({ status: 'completed' });
    const pending = await Donation.countDocuments({ status: 'pending' });
    const totalAmount = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalDonations: total,
        completedDonations: completed,
        pendingDonations: pending,
        totalAmount: totalAmount[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update donation status
// @route   PUT /api/donations/:id
// @access  Private/Admin
export const updateDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    res.status(200).json({ success: true, data: donation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
