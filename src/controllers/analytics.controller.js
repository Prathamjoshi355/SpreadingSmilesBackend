import Activity from '../models/Activity.js';
import Blog from '../models/Blog.js';
import Donation from '../models/Donation.js';
import Gallery from '../models/Gallery.js';
import Volunteer from '../models/Volunteer.js';

export const getAdminAnalytics = async (req, res) => {
  try {
    const [
      blogs,
      activities,
      galleryImages,
      volunteers,
      newVolunteers,
      completedDonations,
      donationTotals
    ] = await Promise.all([
      Blog.countDocuments(),
      Activity.countDocuments(),
      Gallery.countDocuments(),
      Volunteer.countDocuments(),
      Volunteer.countDocuments({ status: 'new' }),
      Donation.countDocuments({ status: 'completed' }),
      Donation.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
      ])
    ]);

    res.status(200).json({
      success: true,
      stats: {
        blogs,
        activities,
        galleryImages,
        volunteers,
        newVolunteers,
        donations: completedDonations,
        totalAmount: donationTotals[0]?.totalAmount || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
