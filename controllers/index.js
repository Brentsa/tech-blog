//import router library as well as the api routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

//instruct router to use the api routes 
router.use('/api', apiRoutes);

//instruct router to use the home routes
router.use('/', homeRoutes);

module.exports = router;