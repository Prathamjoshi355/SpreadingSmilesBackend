import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number']
    },
    interest: {
      type: [String],
      enum: ['education', 'health', 'environment', 'community', 'disaster-relief', 'fundraising', 'other'],
      required: [true, 'Please select at least one interest']
    },
    message: String,
    availability: {
      type: String,
      enum: ['weekdays', 'weekends', 'anytime'],
      default: 'anytime'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'active', 'inactive'],
      default: 'new'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Volunteer', volunteerSchema);
