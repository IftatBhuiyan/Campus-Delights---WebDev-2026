const mongoose = require('mongoose');

const foodSpotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: String,
  priceRange: String,
  rating: Number,
  location: { lat: Number, lng: Number },
  tags: [String],
  hours: Object
});

module.exports = mongoose.model('FoodSpot', foodSpotSchema);