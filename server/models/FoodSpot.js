const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true }
  },
  { timestamps: true }
);

const mediaSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['photo', 'menu screenshot'], default: 'photo' },
    caption: { type: String, default: '' },
    filename: { type: String, default: '' },
    mimeType: { type: String, default: '' },
    dataUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const reportSchema = new mongoose.Schema(
  {
    issueType: {
      type: String,
      enum: ['hours', 'address', 'closed', 'menu', 'other'],
      required: true,
    },
    details: { type: String, required: true },
    email: { type: String, default: '' },
    status: { type: String, enum: ['open', 'reviewed'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
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
    bestFor: { type: [String], default: [] },
    media: { type: [mediaSchema], default: [] },
    reports: { type: [reportSchema], default: [] },
    reviews: { type: [reviewSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FoodSpot', foodSpotSchema);
