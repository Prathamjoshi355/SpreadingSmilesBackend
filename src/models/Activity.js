import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide activity title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide activity description']
    },
    category: {
      type: String,
      enum: ['education', 'health', 'environment', 'community', 'disaster-relief', 'other'],
      default: 'other'
    },
    images: [{
      type: String,
      required: true
    }],
    date: {
      type: Date,
      required: [true, 'Please provide activity date']
    },
    location: String,
    volunteers: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);
