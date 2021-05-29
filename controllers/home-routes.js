const router = require('express').Router();
const sequelize = require('sequelize');
const {User, Post, Comment} = require('../models');
const authorized = require('../utils/authorization');

// Home routes: /
//===============================================================

//Home page
router.get('/', (req, res) => {
   Post.findAll({
      order: [['updated_at', 'DESC']],
      include: User
   })
   .then(dbPostData => {
      //Serialize the db data into a new array
      const posts = dbPostData.map(post => post.get({plain: true}));
      //Render the array as an object to the homepage template
      res.render('home', {loggedIn: req.session.loggedIn, posts});
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

//Single Post Page
router.get('/post/:id', (req, res) => {
   Post.findOne({
      where:{
          id: req.params.id
      },
      include: [
          {
              model: User,
              attributes: ['username', 'createdAt', 'updatedAt']
          },
          {
              model: Comment,
              attributes: ['text', 'created_at'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          }
      ]
  })
  .then(dbPostData => {
      if(!dbPostData){
          res.status(404).json({message: "Post was not found."});
          return;
      }
      
      //serialize the single post data
      const post = dbPostData.get({plain: true});

      //render the data to our single post template
      res.render('post-page', {post, loggedIn: req.session.loggedIn});
  })
  .catch(err => res.status(500).json(err));

});

//Dashboard page
router.get('/dashboard', authorized, (req, res)=>{
   //check if the user is authorized with middleware and redirect to login page if not
   res.render('dashboard');
})


module.exports = router;