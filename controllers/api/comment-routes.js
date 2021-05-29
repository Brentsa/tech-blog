//import router library as well as the models
const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

//Post routes: /api/comments
//===============================================================

//Get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        include: [
            {
                model: Post,
                attributes: ['title']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

//Get single comment
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['title']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({message: 'Comment not found in database'});
        }
        else {
            res.json(dbCommentData);
        }
    })
    .catch(err => res.status(500).json(err));
});

//Create a comment
router.post('/', (req, res) => {
    //expects: { text: "some text here", post_id: 2, user_id: 1 }
    const { text, post_id } = req.body;

    //If there is a logged in session then get the user_id from it
    if(req.session.loggedIn){
        var user_id = req.session.user_id;
    }
    else{
        var user_id = req.body.user_id;
    }

    Comment.create({
        text,
        post_id,
        user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;