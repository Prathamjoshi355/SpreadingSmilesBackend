import mongoose from 'mongoose';

const impactStatSchema = new mongoose.Schema(
  {
    stats: [
      {
        key: {
          type: String,
          required: [true, 'Please provide a stat key']
        },
        label: {
          type: String,
          required: [true, 'Please provide a stat label']
        },
        value: {
          type: String,
          required: [true, 'Please provide a stat value']
        },
        icon: {
          type: String,
          default: 'TrendingUp'
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('ImpactStat', impactStatSchema);
