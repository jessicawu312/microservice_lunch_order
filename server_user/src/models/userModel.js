const db = require("../config/db");

const User = {
  listAll: async () => {
    const sql = "SELECT * FROM users";
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (err) {
      console.error("Failed to list all user:", err);
      return [];
    }
  },
  create: async (name, number, password) => {
    const sql = "INSERT INTO users (name, number, password) VALUES (?, ?, ?)";
    try {
      await db.query(sql, [name, number, password]);
      return { success: true };
    } catch (err) {
      console.error("Failed to create user:", err);
      return { success: false, error: err };
    }
  },
  login: async (name, password) => {
    const sql = "SELECT * FROM users WHERE name = ? AND password = ?";
    try {
      const [rows] = await db.query(sql, [name, password]);
      if (rows.length > 0) {
        return {
          data: { id: rows[0].id, name: rows[0].name, number: rows[0].number },
          success: true,
        };
      } else {
        return { success: false };
      }
    } catch (err) {
      console.error("Failed to authenticate user:", err);
      return { success: false, error: err };
    }
  },
};

module.exports = User;
