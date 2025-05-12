const jwt = require('jsonwebtoken');
const { jwtSecret, cookieName } = require('../config/auth');
const { getUserById } = require('../models/userModel');

// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  // Get token from cookie
  const token = req.cookies[cookieName];
  
  // If no token, redirect to login
  if (!token) {
    return res.redirect('/login?error=Please log in to access this page');
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Check if user exists
    const user = getUserById(decoded.id);
    if (!user) {
      res.clearCookie(cookieName);
      return res.redirect('/login?error=Invalid session, please login again');
    }
    
    // Attach user to request object (exclude password)
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    
    next();
  } catch (error) {
    // If token is invalid, redirect to login
    res.clearCookie(cookieName);
    res.redirect('/login?error=Your session has expired, please login again');
  }
};

// Set current user for all templates
const setCurrentUser = (req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
};

module.exports = {
  isAuthenticated,
  setCurrentUser
};