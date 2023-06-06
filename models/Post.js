const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    language: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
    },
    // category: {
    //   type: DataTypes.STRING
    // },
    // // IF USED IN MODEL CREATE JS FILE TO HIT A PUT ROUTE FOR api/post AND HAVE likeCount update + 1
    // // likeCount: {
    // //   type: DataTypes.INTEGER,
    // //   defaultValue: 0,
    // //   required: false
    // // },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
