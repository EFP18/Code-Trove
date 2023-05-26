GE-models
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
           type:DataType.STRING, 
        },
        body: {
            type: DataTypes.TEXT
        },
        user_id:{
            type: DataTypes.INTEGER,
            refrences:{
                model:'user',
                key: 'id',
                unique: false
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);
