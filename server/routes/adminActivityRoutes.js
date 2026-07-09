const express = require('express');
const foodSpotController = require('../controllers/foodSpotController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/reports', requireAuth, foodSpotController.getAdminReports);
router.get('/media', requireAuth, foodSpotController.getAdminMedia);
router.patch('/reports/:spotId/:reportId', requireAuth, foodSpotController.updateReportStatus);
router.delete('/media/:spotId/:mediaId', requireAuth, foodSpotController.deleteSpotMedia);

module.exports = router;
