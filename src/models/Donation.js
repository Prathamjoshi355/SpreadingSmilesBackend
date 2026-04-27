import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide donor name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide email']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide donation amount']
    },
    currency: {
      type: String,
      default: 'INR'
    },
    paymentId: {
      type: String
    },
    orderId: {
      type: String
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    message: String,
    isAnonymous: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Donation', donationSchema);
