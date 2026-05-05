import ImpactStat from '../models/ImpactStat.js';

const fallbackStats = [
  { key: 'raised', icon: 'TrendingUp', value: 'Loading...', label: 'Raised for medical support' },
  { key: 'activities', icon: 'Activity', value: 'Loading...', label: 'Social activities conducted' },
  { key: 'campaigns', icon: 'Megaphone', value: 'Loading...', label: 'Awareness campaigns executed' },
  { key: 'volunteers', icon: 'Users', value: 'Loading...', label: 'Active volunteers across Indore' }
];

export const getImpactStats = async (req, res, next) => {
  try {
    const impactStats = await ImpactStat.findOne({});

    if (!impactStats || !impactStats.stats?.length) {
      return res.status(200).json({ success: true, data: { stats: fallbackStats } });
    }

    res.status(200).json({ success: true, data: { stats: impactStats.stats } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateImpactStats = async (req, res, next) => {
  try {
    const { stats } = req.body;

    if (!Array.isArray(stats) || stats.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide impact stats to save' });
    }

    const cleanedStats = stats.map((stat, index) => ({
      key: stat.key || `stat-${index}`,
      label: stat.label || fallbackStats[index]?.label || '',
      value: stat.value || fallbackStats[index]?.value || '',
      icon: stat.icon || fallbackStats[index]?.icon || 'TrendingUp'
    }));

    const updated = await ImpactStat.findOneAndUpdate(
      {},
      { stats: cleanedStats },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
