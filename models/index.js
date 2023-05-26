// create associations for models
const Category = require('./Category');
const Post = require('./Post');
const User = require('./User');


User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// 

module.exports = { User, Post, Category};