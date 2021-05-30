//import router library as well as the api routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

//instruct router to use the api routes 
router.use('/api', apiRoutes);

//instruct router to use the dashboard routes
router.use('/dashboard', dashboardRoutes);

//instruct router to use the home routes
router.use('/', homeRoutes);

//send error code if route not found
router.use((req, res) => {res.status(404).end()});

module.exports = router;