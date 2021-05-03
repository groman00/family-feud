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
    await queryInterface.bulkInsert('Answers', [
      {
        text: "Trash/Old Food",
        count: 29,
        rank: 1,
        surveyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()                
      },
      {
        text: "Cigarette/Cigar",
        count: 19,
        rank: 2,
        surveyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()                
      },
      {
        text: "Fresh Farts",
        count: 14,
        rank: 3,
        surveyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()                
      }                
    ], {});         
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Answers', null, {});
  }
};
