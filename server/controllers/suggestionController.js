const FoodSpot = require('../models/FoodSpot');
const Suggestion = require('../models/Suggestion');

exports.createSuggestion = async (req, res) => {
  try {
    const { restaurantName, cuisine, address, reason, email } = req.body;

    if (!restaurantName?.trim() || !reason?.trim()) {
      return res.status(400).json({ message: 'Restaurant name and reason are required' });
    }

    const suggestion = await Suggestion.create({
      restaurantName: restaurantName.trim(),
      cuisine: cuisine?.trim() || '',
      address: address?.trim() || '',
      reason: reason.trim(),
      email: email?.trim() || '',
    });

    res.status(201).json(suggestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    const suggestions = await Suggestion.find(filter).sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSuggestionById = async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }
    res.json(suggestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }

    if (suggestion.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending suggestions can be approved' });
    }

    const {
      priceRange = '$',
      distance = '',
      hours = '',
      description = '',
      menu = [],
      tags = [],
    } = req.body;

    const spot = await FoodSpot.create({
      name: suggestion.restaurantName,
      cuisine: suggestion.cuisine || 'Other',
      priceRange: ['$', '$$', '$$$'].includes(priceRange) ? priceRange : '$',
      distance,
      hours,
      location: suggestion.address,
      description: description || suggestion.reason,
      menu: Array.isArray(menu) ? menu.filter(Boolean) : [],
      tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
      rating: 0,
      reviews: [],
    });

    suggestion.status = 'approved';
    suggestion.reviewedAt = new Date();
    suggestion.approvedFoodSpotId = spot._id;
    await suggestion.save();

    res.json({ suggestion, foodSpot: spot });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.rejectSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }

    if (suggestion.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending suggestions can be rejected' });
    }

    suggestion.status = 'rejected';
    suggestion.rejectionNote = req.body.rejectionNote?.trim() || '';
    suggestion.reviewedAt = new Date();
    await suggestion.save();

    res.json(suggestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
