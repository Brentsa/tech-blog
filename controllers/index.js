//import router library as well as the api routes
const router = require('express').Router();
const apiRoutes = require('./api');

//instruct router to use the api routes 
router.use('/api', apiRoutes);

module.exports = router;