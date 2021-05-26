//import router library as well as the models
const router = require('express').Router();
const {Post, User, Comment} = require('../../models');

//Post routes: /api/posts
//===============================================================

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(500).json(err));
});

//get a single post
router.get('/:id', (req, res) => {
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
        if(!dbPostData)
            res.status(404).json({message: "Post was not found."});
        else
            res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
})

//create a new post
router.post('/', (req, res) => {
    //expects: { title: "NewPost", content: "Everything you could ever dream of", user_id: 1 }
    const { title, content, user_id } = req.body;

    Post.create({
        title,
        content,
        user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;