const User = require('./User');
const Category = require('./Category');
const UserPost = require('./Post');
const Comment = require('./Comment');

// user & userpost
User.hasMany(UserPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

UserPost.belongsTo(User, {
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
UserPost.hasMany(Comment, {
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

module.exports = { User, UserPost, Category, Comment };