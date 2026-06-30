const express = require('express');
const router = express.Router();
const foodSpotController = require('../controllers/foodSpotController');

router.get('/', foodSpotController.getAllFoodSpots);
router.get('/:id', foodSpotController.getFoodSpotById);
router.post('/', foodSpotController.createFoodSpot);
router.post('/:id/reviews', foodSpotController.addReview);

module.exports = router;
