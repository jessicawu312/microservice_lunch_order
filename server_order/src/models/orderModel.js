const db = require("../config/db");

const Order = {
  create: async (total_price, group_id, buyer) => {
    const sql =
      "INSERT INTO orders (total_price, group_id, buyer) VALUES (?, ?, ?)";
    try {
      const [order] = await db.query(sql, [total_price, group_id, buyer]);
      return {
        data: {
          orderId: order.insertId,
        },
        success: true,
      };
    } catch (err) {
      console.error("Failed to create order:", err);
      return { success: false, error: err };
    }
  },
  listGroupOrders: async (group_id) => {
    const sql = `SELECT a.order_id, a.name as 'item_name', u.name as 'user_name', a.total_price
      FROM (SELECT x.order_id, x.buyer, g.name, x.total_price
        FROM (SELECT o.id as 'order_id', o.group_id, i.item_id, o.buyer, o.total_price
          FROM orders o
          LEFT JOIN order_items i ON o.id = i.order_id
          WHERE o.group_id = ?) x
        LEFT JOIN group_items g ON x.item_id = g.id) a
      LEFT JOIN users u ON a.buyer = u.id;
    `;
    try {
      const [rows] = await db.query(sql, [group_id]);
      return rows;
    } catch (err) {
      console.error("Failed to list group orders:", err);
      return [];
    }
  },
};

module.exports = Order;
