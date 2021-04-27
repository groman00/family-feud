'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Survey.hasMany(models.Answer, {
        foreignKey: 'surveyId',
      });      
    }
  };
  Survey.init({
    title: DataTypes.STRING,
    totalAnswers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Survey',
  });
  return Survey;
};