'use strict';
const bcrypt = require('bcryptjs');
const seedData = require('../public/data/restaurant.json').results;
const { getDataWithoutId } = require('../utils/tools');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = ['user1', 'user2'];
    const usersRestaurants = {
      user1: seedData.slice(0, 3).map((data) => ({
        ...getDataWithoutId(data),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      user2: seedData.slice(3, 6).map((data) => ({
        ...getDataWithoutId(data),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    }

    try {
      const password = await bcrypt.hash('12345678', 10);

      await queryInterface.sequelize.transaction(async (transaction) => {
        for (const user of users) {
          const id = await queryInterface.bulkInsert('Users', [{
            name: user,
            email: `${user}@example.com`,
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
          }], { transaction });

          usersRestaurants[user].forEach((rowData) => rowData.userId = id);
          await queryInterface.bulkInsert('Restaurants',
            usersRestaurants[user],
            { transaction },
          );
        }
      });
    } catch (err) {
      console.log(err);
    }

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
};
