'use strict';
const seedData = require('../public/data/restaurant.json').results;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants',
      seedData.map((row) => {
        const { id, ...rowContent } = row;
        return {
          ...rowContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }),
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null);
  }
};
