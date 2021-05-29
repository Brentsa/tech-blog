//import router library as well as the models
const router = require('express').Router();
const {Post, User, Comment} = require('../../models');
const authorized = require('../../utils/authorization');

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
router.post('/', authorized, (req, res) => {
    //expects: { title: "NewPost", content: "Everything you could ever dream of", user_id: 1 }
    const { title, content} = req.body;

    if(req.session.loggedIn){
        var user_id = req.session.user_id
    }
    else{
        var user_id = req.body.user_id
    }
    
    Post.create({
        title,
        content,
        user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(500).json(err));
});

//Update a post's title and/or content
router.put('/:id', authorized, (req, res) => {
    //expects: { title: "NewPost", content: "Everything you could ever dream of" }
    const { title, content} = req.body;

    Post.update(
        {
            title,
            content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbUpdatedData => {
        if(!dbUpdatedData){
            res.status(404).json({message: 'Post with specified id not found.'})
            return;
        }

        res.json(dbUpdatedData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete a post based on id
router.delete('/:id', authorized, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No blog post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;