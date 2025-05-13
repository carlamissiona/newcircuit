const express = require('express');
const router = express.Router(); 
const { getFriends,rendrFriendsNotif } = require('../controllers/friendsController');
const { isAuthenticated, setCurrentUser } = require('../middleware/authMiddleware');

// Apply middleware
router.use(isAuthenticated);
router.use(setCurrentUser);

// Friends route
router.get('/', getFriends);

module.exports = router;