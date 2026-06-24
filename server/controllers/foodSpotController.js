const FoodSpot = require('../models/FoodSpot');

exports.getAllFoodSpots = async (req, res) => {
  try {
    const spots = await FoodSpot.find();
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};