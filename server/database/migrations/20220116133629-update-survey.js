'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Surveys',
      'strikes', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    );    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Surveys',
      'strikes'
    );  
  }
};
