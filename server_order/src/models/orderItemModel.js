const db = require("../config/db");

const OrderItem = {
  create: async (data) => {
    const sql = "INSERT INTO order_items (item_id, order_id) VALUES ?";
    try {
      await db.query(sql, [data]);
      return { success: true };
    } catch (err) {
      console.error("Failed to create order items:", err);
      return { success: false, error: err };
    }
  },
};

module.exports = OrderItem;
