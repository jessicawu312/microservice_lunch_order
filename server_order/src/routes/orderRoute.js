const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/groupOrders", orderController.createOrder);
router.post("/mygroupOrders", orderController.getGroupOrders);
module.exports = router;
