'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Answers',
      'revealed', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    );    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Answers',
      'revealed'
    );     
  }
};
