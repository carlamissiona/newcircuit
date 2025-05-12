const express = require('express');
const router = express.Router();
const { showDashboard } = require('../controllers/dashboardController');
const { isAuthenticated, setCurrentUser } = require('../middleware/authMiddleware');

// Apply middleware
router.use(isAuthenticated);
router.use(setCurrentUser);

// Dashboard route
router.get('/', showDashboard);

module.exports = router;