const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true }
  },
  { timestamps: true }
);

const foodSpotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    priceRange: { type: String, enum: ['$', '$$', '$$$'], default: '$' },
    distance: { type: String, default: '' },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    location: { type: String, default: '' },
    hours: { type: String, default: '' },
    description: { type: String, default: '' },
    menu: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    reviews: { type: [reviewSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FoodSpot', foodSpotSchema);
