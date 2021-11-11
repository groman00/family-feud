'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Game.hasMany(models.Player, {
      //   foreignKey: "id",
      //   sourceKey: "gameId",
      // });   
      Game.hasMany(models.Player);      
      // Game.hasMany(models.Team, {
      //   foreignKey: 'gameId',
      // });   
      // Game.hasOne(models.Host, {
      //   foreignKey: 'gameId',
      // });     
      // Game.hasMany(models.Survey, {
      //   foreignKey: 'gameId',
      // });  
    }
  };
  Game.init({
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};