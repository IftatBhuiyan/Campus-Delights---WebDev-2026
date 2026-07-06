const express = require('express');
const suggestionController = require('../controllers/suggestionController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', suggestionController.createSuggestion);
router.get('/', requireAuth, suggestionController.getSuggestions);
router.get('/:id', requireAuth, suggestionController.getSuggestionById);
router.patch('/:id/approve', requireAuth, suggestionController.approveSuggestion);
router.patch('/:id/reject', requireAuth, suggestionController.rejectSuggestion);

module.exports = router;
