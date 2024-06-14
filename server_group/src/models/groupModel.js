const db = require("../config/db");

const Group = {
  listAll: async () => {
    const sql = "SELECT * FROM `groups`";
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (err) {
      console.error("Failed to list all group:", err);
      return [];
    }
  },
  listUserGroup: async (user_id) => {
    const sql = "SELECT * FROM `groups` WHERE owner = ?";
    try {
      const [rows] = await db.query(sql, [user_id]);
      return rows;
    } catch (err) {
      console.error("Failed to list all user's group:", err);
      return [];
    }
  },
  create: async (name, place, owner) => {
    const sql = "INSERT INTO `groups` (name, place, owner) VALUES (?, ?, ?)";
    try {
      const [group] = await db.query(sql, [name, place, owner]);
      return {
        data: {
          groupId: group.insertId,
        },
        success: true,
      };
    } catch (err) {
      console.error("Failed to create group:", err);
      return { success: false, error: err };
    }
  },
};

module.exports = Group;
