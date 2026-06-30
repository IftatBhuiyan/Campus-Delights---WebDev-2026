const FoodSpot = require('../models/FoodSpot');

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

    const spots = await FoodSpot.find(filter);
    res.json(sortSpots(spots, sortBy));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFoodSpotById = async (req, res) => {
  try {
    const spot = await FoodSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Food spot not found' });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFoodSpot = async (req, res) => {
  try {
    const spot = await FoodSpot.create(req.body);
    res.status(201).json(spot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const spot = await FoodSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Food spot not found' });

    spot.reviews.push(req.body);
    const total = spot.reviews.reduce((sum, review) => sum + review.rating, 0);
    spot.rating = Math.round((total / spot.reviews.length) * 10) / 10;

    await spot.save();
    res.status(201).json(spot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
