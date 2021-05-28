//import router library as well as the User model
const router = require('express').Router();
const {User} = require('../../models');

//User routes: /api/users
//===============================================================

//return all users in the db
router.get('/', (req, res) => {
    User.findAll({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

//Get a single user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'User not found in database'});
        }
        else {
            res.json(dbUserData);
        }
    })
    .catch(err => res.status(500).json(err));
});

//create a new user in the db
router.post('/', (req, res) => {
    //expects: { username: testUser, password: eatfood123}
    const {username, password} = req.body;

    User.create({
        username,
        password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.username = dbUserData.username;
            req.session.password = dbUserData.password;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => res.status(500).json(err));
});

//Log the user in
router.post('/login', (req, res) => {
    //expects {username: 'testuserhere', password: 'password1234'}
    const {username, password} = req.body;

    User.findOne({
        where:{
            username
        }
    })
    .then(dbUserData => {
        //If there is no user data then we state no account is found and terminate the function
        if(!dbUserData){
            res.status(404).json({message: "Account not found."});
            return;
        }

        const validPassword = dbUserData.validatePassword(password);

        //Validate the given password and terminate the function if it is not found
        if(!validPassword){
            res.status(404).json({message: "Incorrect password."});
            return;
        }

        //If login credentials are correct then we log the user in and save the session
        req.session.save(() => {
            req.session.username = dbUserData.username;
            req.session.password = dbUserData.password;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are logged in!' });
        })

    })
})

//Log the user out
router.post('/logout', (req, res) => {
    //if we are logged in then destroy the session
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
    //otherwise, just send back success since there is nothing to do
    else{
        res.status(204).end();
    }
});

module.exports = router;