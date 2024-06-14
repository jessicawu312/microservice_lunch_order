"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      [
        {
          name: "花腱牛肉麵",
          price: 100,
        },
        {
          name: "牛肉湯麵",
          price: 80,
        },
        {
          name: "炸醬麵",
          price: 55,
        },
        {
          name: "麻醬麵",
          price: 55,
        },
        {
          name: "半筋半肉牛肉麵",
          price: 180,
        },
      ],
      [
        {
          name: "烤肉飯",
          price: 65,
        },
      ],
      [
        {
          name: "炙燒牛花飯",
          price: 175,
        },
        {
          name: "招牌燒肉飯",
          price: 110,
        },
        {
          name: "黃金唐揚雞腿塊飯",
          price: 130,
        },
        {
          name: "極炙雞腿飯",
          price: 130,
        },
      ],
      [
        {
          name: "滷排骨便當",
          price: 90,
        },
        {
          name: "滷雞腿便當",
          price: 100,
        },
        {
          name: "招牌雞排飯",
          price: 90,
        },
        {
          name: "招牌豬排飯",
          price: 90,
        },
      ],
      [
        {
          name: "香酥雞排",
          price: 55,
        },
        {
          name: "泡菜豬肉",
          price: 55,
        },
        {
          name: "燻香雞肉",
          price: 55,
        },
        {
          name: "起司培根",
          price: 55,
        },
        {
          name: "剝皮辣椒雞",
          price: 55,
        },
        {
          name: "蔥爆牛肉",
          price: 55,
        },
        {
          name: "元氣牛蒡",
          price: 55,
        },
        {
          name: "黃金鮪魚",
          price: 55,
        },
      ],
      [
        {
          name: "冠軍酥皮鍋貼(7顆)",
          price: 99,
        },
        {
          name: "冠軍酥皮鍋貼(11顆)",
          price: 138,
        },
        {
          name: "繽紛綜合水餃",
          price: 88,
        },
        {
          name: "酸辣湯",
          price: 60,
        },
        {
          name: "魚丸湯",
          price: 60,
        },
      ],
    ];

    const itemArr = [];

    for (let i = 1; i <= items.length; i++) {
      for (let j = 1; j <= items[i - 1].length; j++) {
        const group_item = {
          name: items[i - 1][j - 1].name,
          price: items[i - 1][j - 1].price,
          group_id: i,
        };
        itemArr.push(group_item);
      }
    }
    return queryInterface.bulkInsert("group_items", itemArr);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("group_items", null, {});
  },
};
