//import router and route files
const router = require('express').Router();
const userRoutes = require('./user-routes');

//direct the router to use our routes
router.use('/users', userRoutes);

module.exports = router;