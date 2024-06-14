"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userArr = [];
    const numberPrefix = "131123400";

    for (let i = 1; i <= 10; i++) {
      const order = {
        id: i,
        name: faker.internet.userName(),
        number: numberPrefix.concat("", i),
        password: numberPrefix.concat("", i),
      };
      userArr.push(order);
    }

    return queryInterface.bulkInsert("users", userArr);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
