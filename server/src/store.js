const { Sequelize } = require('sequelize');

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: './store.sqlite'
  });

  const surveys = db.define('survey', {
    title: Sequelize.STRING,
    totalResponses: Sequelize.INTEGER,
  });

  return { db, surveys };
};