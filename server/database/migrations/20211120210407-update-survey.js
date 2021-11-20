module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Surveys', 'gameId', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),

      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Surveys', 'gameId', { transaction: t }),
      ]);
    });
  }
};