//import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//User has many posts, a post belongs to a single user
User.hasMany(Post, {foreignKey: "user_id"});
Post.belongsTo(User, {foreignKey: "user_id"});

//A user has many comments but a comment belongs to a single user
User.hasMany(Comment, {foreignKey: 'user_id'});
Comment.belongsTo(User, {foreignKey: 'user_id'});

//A post has many comments but a comment belongs to one post
Post.hasMany(Comment, {foreignKey: 'post_id'});
Comment.belongsTo(Post, {foreignKey: 'post_id'});

module.exports = {User, Post, Comment};