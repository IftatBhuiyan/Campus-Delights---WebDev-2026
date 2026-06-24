require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const foodSpotRoutes = require('./routes/foodSpotRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/foodspots', foodSpotRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));