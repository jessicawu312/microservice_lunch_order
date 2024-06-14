const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const { total_price, group_id, buyer, item_id } = req.body;
    const result = await Order.create(total_price, group_id, buyer, item_id);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to create order." });
    }
    res.json({
      data: result.data,
      success: true,
      message: "Order create successfully.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server Error! Failed to create order." });
  }
};

exports.getGroupOrders = async (req, res) => {
  try {
    const { group_id } = req.body;
    const groupOrders = await Order.listGroupOrders(group_id);
    res.json({ success: true, data: groupOrders });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error! Failed to list group orders.",
    });
  }
};
