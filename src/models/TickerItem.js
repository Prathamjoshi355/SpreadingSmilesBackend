import mongoose from 'mongoose';

const tickerItemSchema = new mongoose.Schema(
  {
    items: [
      {
        _id: false,
        text: {
          type: String,
          required: [true, 'Please provide ticker text']
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('TickerItem', tickerItemSchema);
