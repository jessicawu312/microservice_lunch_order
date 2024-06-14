const db = require("../config/db");

const GroupItem = {
  listAll: async (g_id) => {
    const sql = "SELECT * FROM group_items WHERE group_id = ?";
    try {
      const [rows] = await db.query(sql, [g_id]);
      return rows;
    } catch (err) {
      console.error("Failed to list all group items:", err);
      return [];
    }
  },
  create: async (data) => {
    const sql = "INSERT INTO group_items (name, price, group_id) VALUES ?";
    try {
      await db.query(sql, [data]);
      return { success: true };
    } catch (err) {
      console.error("Failed to create group items:", err);
      return { success: false, error: err };
    }
  },
};

module.exports = GroupItem;
