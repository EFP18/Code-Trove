// create associations for models
const Category = require('./Category');
const Post = require('./Post');
const User = require('./User');
const PostCategory = require('./PostCategory');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

//

Category.belongsToMany(Post, {
  through: PostCategory,
  foreignKey: 'category_id',
});

Post.belongsToMany(Category, {
  through: PostCategory,
  foreignKey: 'post_id',
});

module.exports = { User, Post, Category };
