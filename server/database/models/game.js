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
      Game.hasMany(models.Player);        
      Game.hasMany(models.Survey);  
    }
  };
  Game.init({
    token: DataTypes.STRING,
    turn: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};