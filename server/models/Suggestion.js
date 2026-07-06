const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, required: true, trim: true },
    cuisine: { type: String, default: '', trim: true },
    address: { type: String, default: '', trim: true },
    reason: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionNote: { type: String, default: '' },
    reviewedAt: { type: Date },
    approvedFoodSpotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodSpot',
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Suggestion', suggestionSchema);
