'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Met en place la relation "m to m" (many to many) pour une relation entre la table users et posts *
      //en passant par la table de jonction Likes
      models.User.belongsToMany(models.Post, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'postId',
      });

      //Met en place la relation "m to m" (many to many) pour une relation entre la table users et posts *
      //en passant par la table de jonction Likes
      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'postId',
        otherKey: 'userId',
      });

      //Fait le lien entre les clef étrangères (foreignKey) et la table de référence
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      //Fait le lien entre les clef étrangères (foreignKey) et la table de référence
      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
      });
    }
  }
  Like.init({
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
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};