const User = require('./User');
const Category = require('./Category');
const UserPost = require('./UserPost');
const Comment = require('./Comment');
const Likes = require('./Likes');

// user & userpost
User.hasMany(UserPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

UserPost.belongsTo(User, {
    foreignKey: 'user_id'
});

Likes.belongsTo(UserPost, {
    foreignKey: 'post_id'
});

Likes.belongsTo(User, {
    foreignKey: 'post_id'
});

// user & comment
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// userpost & comment
UserPost.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// userpost & comment
UserPost.hasMany(Likes, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(UserPost, {
    foreignKey: 'post_id'
});


// Category & userpost
UserPost.belongsTo(Category, {
    foreignKey: 'category_id',
});

Category.hasMany(UserPost, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

module.exports = { User, UserPost, Category, Comment, Likes };