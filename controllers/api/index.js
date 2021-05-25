//import router and route files
const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

//direct the router to use our routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;