'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Games',
      'turn', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    );    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Games',
      'turn'
    );
  }
};
