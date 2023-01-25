const User = require('./User');
const Category = require('./Category');
const UserPost = require('./UserPost');
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
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(UserPost, {
    foreignKey: 'user_id'
});

// user and hashtag
User.hasMany(Hashtag, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Hashtag.hasMany(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// hashtag & userpost
Hashtag.hasMany(UserPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

UserPost.hasMany(Hashtag, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, UserPost, Hashtag, Comment };