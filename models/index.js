const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//users can make many posts
User.hasMany(Post, {
  foreignKey: 'userId'
});

//user can have many comments
User.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// post belongs to one user
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

//Posts have many comments
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

//A comment only belongs to one user
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

//comment belongs to one post
Comment.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
})

module.exports = {
  User,
  Comment,
  Post
};