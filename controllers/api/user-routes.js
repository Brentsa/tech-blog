//import router library as well as the User model
const router = require('express').Router();
const User = require('../../models/User');

//User routes: /api/users
//===============================================================

//return all users in the db
router.get('/', (req, res) => {
    User.findAll({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
})

//create a new user in the db
router.post('/', (req, res) => {
    //expects: { username: testUser, password: eatfood123}
    const {username, password} = req.body;

    User.create({
        username,
        password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
})

module.exports = router;