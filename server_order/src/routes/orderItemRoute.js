const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

router.post("/groupOrders/item", orderItemController.createOrderItem);

module.exports = router;
