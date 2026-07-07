const express = require('express');
const router = express.Router();
const foodSpotController = require('../controllers/foodSpotController');

router.get('/', foodSpotController.getAllFoodSpots);
router.get('/:id', foodSpotController.getFoodSpotById);
router.post('/', foodSpotController.createFoodSpot);
router.post('/:id/reviews', foodSpotController.addReview);
router.post('/:id/media', foodSpotController.addSpotMedia);
router.post('/:id/reports', foodSpotController.reportFoodSpotInfo);

module.exports = router;
