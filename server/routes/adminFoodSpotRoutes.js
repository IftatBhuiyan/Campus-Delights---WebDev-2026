const express = require('express');
const foodSpotController = require('../controllers/foodSpotController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, foodSpotController.getAdminFoodSpots);
router.patch('/:id', requireAuth, foodSpotController.updateFoodSpot);
router.patch('/:id/archive', requireAuth, foodSpotController.setFoodSpotArchived);

module.exports = router;
