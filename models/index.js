//import models
const User = require('./User');
const Post = require('./Post');

//User has many posts, a post belongs to a single user
User.hasMany(Post, {foreignKey: "user_id"});
Post.belongsTo(User, {foreignKey: "user_id"});

module.exports = {User, Post};