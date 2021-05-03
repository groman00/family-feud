'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Survey, {
        foreignKey: 'surveyId',
        onDelete: 'CASCADE'
      })      
    }
  };
  Answer.init({
    text: DataTypes.STRING,
    count: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    surveyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};