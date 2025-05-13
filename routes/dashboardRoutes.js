const express = require('express');
const router = express.Router();
const { showDashboard,rendrHome } = require('../controllers/dashboardController'); 
const { isAuthenticated, setCurrentUser } = require('../middleware/authMiddleware');

// Apply middleware
router.use(isAuthenticated);
router.use(setCurrentUser);

// Dashboard route
router.get('/', rendrHome);
// router.get('/onboarding', rendrOnboard);
// router.get('/beta-trial', rendrBeta);

module.exports = router;