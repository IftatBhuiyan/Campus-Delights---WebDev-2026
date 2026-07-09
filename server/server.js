require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const foodSpotRoutes = require('./routes/foodSpotRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const authRoutes = require('./routes/authRoutes');
const adminFoodSpotRoutes = require('./routes/adminFoodSpotRoutes');

if (!process.env.MONGO_URI) {
  console.error(
    'Missing MONGO_URI. Copy server/.env.example to server/.env and add your MongoDB connection string.',
  );
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/foodspots', foodSpotRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/foodspots', adminFoodSpotRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));