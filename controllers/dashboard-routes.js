const router = require('express').Router();
const sequelize = require('sequelize');
const {User, Post, Comment} = require('../models');
const authorized = require('../utils/authorization');

// Dashboard routes: /dashboard
//===============================================================

//Dashboard page
router.get('/', authorized, (req, res)=>{
     //check if the user is authorized with middleware and load their posts and redirect to login page if not
    Post.findAll({
        where:{
            user_id: req.session.user_id
        }
    })
    .then(dbPostData => {
        //serialize the user's post data
        const posts =  dbPostData.map(post => post.get({plain: true}));
       
        //render the dashboard
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.status(500).json(err));
 });

 module.exports = router;