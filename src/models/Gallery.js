import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, 'Please provide image URL']
    },
    title: {
      type: String,
      trim: true
    },
    description: String,
    category: {
      type: String,
      enum: ['event', 'team', 'activity', 'impact', 'other'],
      default: 'other'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
