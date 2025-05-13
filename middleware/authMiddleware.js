const jwt = require('jsonwebtoken');
const { jwtSecret, cookieName } = require('../config/auth');
const { getUserById } = require('../models/userModel');


const { getUserByEmailDB,getUserByIdDB ,createUserDB } = require('../db');

// Check if user is authenticated
  const isAuthenticated = async (req, res, next) => {
  // Get token from cookie
  const token = req.cookies[cookieName];
  
  // If no token, redirect to login
  if (!token) {
    return res.redirect('/login?error=Please log in to access this page');
  }
  
  console.log("This is cokkie");
  console.log(token);
  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Check if user exists
    const user = await getUserByIdDB(decoded.id);
    if (!user) {
      res.clearCookie(cookieName);
      return res.redirect('/login?error=Invalid session, please login again!');
    }else{

       console.log("user");
       console.log( user);
    }
    
    
    // Attach user to request object (exclude password)
    const  { nc_email , nc_password, id } = user;
    req.user = id;
    req.email = nc_email;
    
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