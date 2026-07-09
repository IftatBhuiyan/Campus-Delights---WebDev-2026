const FoodSpot = require('../models/FoodSpot');

const normalizeList = (value) => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
};

const normalizeMediaAttachment = (attachment) => ({
  kind: attachment.kind === 'menu screenshot' ? 'menu screenshot' : 'photo',
  caption: String(attachment.caption || '').trim(),
  filename: String(attachment.filename || '').trim(),
  mimeType: String(attachment.mimeType || '').trim(),
  dataUrl: String(attachment.dataUrl || '').trim(),
  uploadedAt: new Date(),
});

const parseDistance = (value) => {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const match = String(value).match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : Number.MAX_SAFE_INTEGER;
};

const sortSpots = (spots, sortBy) => {
  const sorted = [...spots];
  switch (sortBy) {
    case 'rating-desc':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'distance-asc':
      return sorted.sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));
    case 'price-asc':
      return sorted.sort((a, b) => (a.priceRange || '').length - (b.priceRange || '').length);
    case 'price-desc':
      return sorted.sort((a, b) => (b.priceRange || '').length - (a.priceRange || '').length);
    default:
      return sorted;
  }
};

exports.getAllFoodSpots = async (req, res) => {
  try {
    const { search, priceRange, cuisine, minRating, sortBy } = req.query;
    const filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ name: regex }, { cuisine: regex }];
    }
    if (priceRange) filter.priceRange = priceRange;
    if (cuisine) filter.cuisine = new RegExp(`^${cuisine}$`, 'i');
    if (minRating) filter.rating = { $gte: Number(minRating) };
    filter.archived = { $ne: true };

    const spots = await FoodSpot.find(filter);
    res.json(sortSpots(spots, sortBy));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFoodSpotById = async (req, res) => {
  try {
    const spot = await FoodSpot.findById(req.params.id);
    if (!spot || spot.archived) return res.status(404).json({ message: 'Food spot not found' });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFoodSpot = async (req, res) => {
  try {
    const spot = await FoodSpot.create({
      ...req.body,
      menu: normalizeList(req.body.menu),
      tags: normalizeList(req.body.tags),
      bestFor: normalizeList(req.body.bestFor),
      media: Array.isArray(req.body.media)
        ? req.body.media.map(normalizeMediaAttachment).filter((item) => item.dataUrl)
        : [],
      reports: [],
    });
    res.status(201).json(spot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const spot = await FoodSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Food spot not found' });
    if (spot.archived) return res.status(404).json({ message: 'Food spot not found' });

    spot.reviews.push(req.body);
    const total = spot.reviews.reduce((sum, review) => sum + review.rating, 0);
    spot.rating = Math.round((total / spot.reviews.length) * 10) / 10;

    await spot.save();
    res.status(201).json(spot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addSpotMedia = async (req, res) => {
  try {
    const spot = await FoodSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Food spot not found' });
    if (spot.archived) return res.status(404).json({ message: 'Food spot not found' });

    const attachments = Array.isArray(req.body.attachments) ? req.body.attachments : [];
    if (attachments.length === 0) {
      return res.status(400).json({ message: 'At least one photo or screenshot is required' });
    }

    const normalized = attachments
      .map(normalizeMediaAttachment)
      .filter((attachment) => attachment.dataUrl.startsWith('data:image/'));

    if (normalized.length === 0) {
      return res.status(400).json({ message: 'Please upload a valid image file' });
    }

    spot.media.push(...normalized);
    await spot.save();

    res.status(201).json(spot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.reportFoodSpotInfo = async (req, res) => {
  try {
    const spot = await FoodSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Food spot not found' });
    if (spot.archived) return res.status(404).json({ message: 'Food spot not found' });

    const issueType = String(req.body.issueType || '').trim();
    const details = String(req.body.details || '').trim();
    if (!issueType || !details) {
      return res.status(400).json({ message: 'Issue type and details are required' });
    }

    spot.reports.push({
      issueType,
      details,
      email: String(req.body.email || '').trim(),
      status: 'open',
      createdAt: new Date(),
    });

    await spot.save();
    res.status(201).json(spot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const editableFields = [
  'name',
  'cuisine',
  'priceRange',
  'distance',
  'location',
  'hours',
  'description',
  'archived',
];

exports.getAdminFoodSpots = async (req, res) => {
  try {
    const { show = 'all' } = req.query;
    const filter = {};

    if (show === 'active') filter.archived = { $ne: true };
    if (show === 'archived') filter.archived = true;

    const spots = await FoodSpot.find(filter).sort({ name: 1 });
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFoodSpot = async (req, res) => {
  try {
    const spot = await FoodSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Food spot not found' });

    editableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        spot[field] = req.body[field];
      }
    });

    if (req.body.menu !== undefined) spot.menu = normalizeList(req.body.menu);
    if (req.body.tags !== undefined) spot.tags = normalizeList(req.body.tags);
    if (req.body.bestFor !== undefined) spot.bestFor = normalizeList(req.body.bestFor);

    if (spot.priceRange && !['$', '$$', '$$$'].includes(spot.priceRange)) {
      return res.status(400).json({ message: 'Price range must be $, $$, or $$$' });
    }

    await spot.save();
    res.json(spot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.setFoodSpotArchived = async (req, res) => {
  try {
    const spot = await FoodSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Food spot not found' });

    spot.archived = Boolean(req.body.archived);
    await spot.save();
    res.json(spot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
