const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', authRoutes);
app.use('/home', dashboardRoutes);
app.use('/myprofile', profileRoutes);
app.use('/friends', friendsRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Express Auth App' });
});
 
 
// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});



// get friends
// add friends
// get friends notif 

module.exports = app;