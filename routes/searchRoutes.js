const express = require('express');
const router = express.Router();
const {   get_search  } = require('../controllers/dashboardController'); 
const { isAuthenticated, setCurrentUser } = require('../middleware/authMiddleware');


router.use(isAuthenticated);
router.use(setCurrentUser);

// Search route
 

router.get('/', get_search); 

 
module.exports = router;