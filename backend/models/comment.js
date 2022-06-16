'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Fait le lien entre les clef étrangères (foreignKey) et la table de référence
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      //Fait le lien entre les clef étrangères (foreignKey) et la table de référence
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
      });
      /*       models.Comment.hasMany(models.Like);
       */
    }
  }
  Comment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};