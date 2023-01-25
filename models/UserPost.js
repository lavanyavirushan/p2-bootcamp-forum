const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserPost extends Model {}

UserPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
			type: DataTypes.STRING,
			allowNull: false,
    },
    post_message: {
			type: DataTypes.STRING,
			allowNull: false,
    },
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_post',
  }
);

module.exports = UserPost;
