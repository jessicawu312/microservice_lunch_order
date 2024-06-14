const OrderItem = require("../models/orderItemModel");

exports.createOrderItem = async (req, res) => {
  try {
    const { item_id, order_id } = req.body;

    const data = [];
    for (let i = 0; i < item_id.length; i++) {
      data.push([item_id[i], order_id]);
    }
    const result = await OrderItem.create(data);

    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to create order item." });
    }
    res.json({
      success: true,
      message: "Order item create successfully.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server Error! Failed to create order." });
  }
};
