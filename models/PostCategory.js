const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config.connection');

class PostCategory extends Model {
}


PostCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id:{
      type: DataTypes.INTEGER,
      references:{
          model:'post',
          key: 'id',
          unique: false
      }
    },
    post_id:{
      type: DataTypes.INTEGER,
      references:{
          model:'category',
          key: 'id',
          unique: false
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'postcategory',
  }
);

module.exports = PostCategory;