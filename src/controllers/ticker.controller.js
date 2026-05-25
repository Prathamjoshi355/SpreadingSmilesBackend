import TickerItem from '../models/TickerItem.js';

const defaultItems = [
  { text: 'Helpline: +91 98765 43210' },
  { text: 'spreadsingsmiles@gmail.com' },
  { text: 'Indore, Madhya Pradesh' }
];

export const getTickerItems = async (req, res, next) => {
  try {
    const tickerItems = await TickerItem.findOne({});

    if (!tickerItems || !tickerItems.items?.length) {
      return res.status(200).json({ success: true, data: { items: defaultItems } });
    }

    const items = tickerItems.items.slice(0, 3).map((item) => ({ text: item.text }));
    res.status(200).json({ success: true, data: { items } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTickerItems = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length !== 3) {
      return res.status(400).json({ success: false, message: 'Please provide exactly three ticker texts' });
    }

    const cleanedItems = items.map((item) => ({
      text: item.text?.trim() || ''
    }));

    if (cleanedItems.some((item) => !item.text)) {
      return res.status(400).json({ success: false, message: 'Please fill in all ticker texts' });
    }

    await TickerItem.findOneAndUpdate(
      {},
      { items: cleanedItems },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: { items: cleanedItems } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
