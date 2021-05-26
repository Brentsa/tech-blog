const router = require('express').Router();
const sequelize = require('sequelize');
const {User, Post, Comment} = require('../models');

// Home routes: /
//===============================================================

router.get('/', (req, res) => {
   res.render('home'); 
});

module.exports = router;