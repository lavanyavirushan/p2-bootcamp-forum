const User = require('./User');
const Category = require('./Category');
const Post = require('./UserPost');
const Comment = require('./Comment');

// user & userpost
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
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
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});


// Category & userpost
Post.belongsTo(Category, {
    foreignKey: 'category_id',
});

Category.hasMany(Post, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Category, Comment };