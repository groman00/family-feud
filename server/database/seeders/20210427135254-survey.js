'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Surveys', [
      {
        id: 1,
        title: "Name something you'd hate to smell when you climb into a date's car.",
        totalAnswers: 100,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        id: 2,
        title: "Nobody wants to see pictures of your what?",
        totalAnswers: 100,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        id: 3,
        title: "Name something a housefly dies from that you'd hate to be the cause of your death.",
        totalAnswers: 100,
        createdAt: new Date(),
        updatedAt: new Date()        
      },            
    ], {});     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Surveys', null, {});
  }
};
