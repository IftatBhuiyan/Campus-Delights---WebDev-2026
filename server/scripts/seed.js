require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const FoodSpot = require('../models/FoodSpot');

const sampleData = [
  { name: 'Pizza Place', cuisine: 'Italian', priceRange: '$$', rating: 4.5 },
  { name: 'Sushi Bar', cuisine: 'Japanese', priceRange: '$$$', rating: 4.8 }
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await FoodSpot.deleteMany({});
  await FoodSpot.insertMany(sampleData);
  console.log('Database seeded');
  process.exit();
};

seedDB();