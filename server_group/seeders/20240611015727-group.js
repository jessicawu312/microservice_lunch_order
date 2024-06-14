"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const groupArr = [];

    const nameChoice = [
      "牛屋牛肉麵",
      "小紅帽烤肉飯",
      "飯飯",
      "大牌檔便當",
      "哇哉飯捲",
      "盛煎鍋貼",
    ];

    const placeChoice = [
      "中正大樓一樓",
      "弘業樓8樓",
      "中正花園",
      "校門口警衛室旁",
    ];

    for (let i = 1; i <= 6; i++) {
      const order = {
        id: i,
        name: nameChoice[i - 1],
        place: placeChoice[Math.floor(Math.random() * 4)],
        owner: Math.floor(Math.random() * 10 + 1),
      };
      groupArr.push(order);
    }

    return queryInterface.bulkInsert("groups", groupArr);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("groups", null, {});
  },
};
