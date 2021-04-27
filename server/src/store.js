const { Sequelize } = require('sequelize');

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: './store.sqlite'
  });

  const Survey = db.define('survey', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    totalResponses: Sequelize.INTEGER,
  });

  const SurveyResponse = db.define('surveyResponse', {
    count: Sequelize.INTEGER,
    text: Sequelize.STRING,
    rank: Sequelize.INTEGER,
    surveyId: {
      type: Sequelize.UUID,
      references: {
        model: Survey,
        key: 'id'
      }
    },    
  });  

  return { db, Survey, SurveyResponse };
};