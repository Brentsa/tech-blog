const router = require('express').Router();
const sequelize = require('sequelize');
const {User, Post, Comment} = require('../models');

// Home routes: /
//===============================================================

//Home page
router.get('/', (req, res) => {
   Post.findAll({
      include: User
   })
   .then(dbPostData => {
      //Serialize the db data into a new array
      const posts = dbPostData.map(post => post.get({plain: true}));
      //Render the array as an object to the homepage template
      res.render('home', {posts});
   })
   .catch(err => res.status(500).json(err));
});

//Login page
router.get('/login', (req, res) => {
   if(req.session.loggedIn){
      res.redirect('/');
      return;
   }

   res.render('login');
})

//Signup page
router.get('/signup', (req, res) => {
   if(req.session.loggedIn){
      res.redirect('/');
      return;
   }

   res.render('signup');
})

module.exports = router;