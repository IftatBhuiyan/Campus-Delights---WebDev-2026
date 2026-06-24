const express = require('express');
const router = express.Router();
const foodSpotController = require('../controllers/foodSpotController');

router.get('/', foodSpotController.getAllFoodSpots);

module.exports = router;