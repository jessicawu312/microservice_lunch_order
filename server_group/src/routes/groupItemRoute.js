const express = require("express");
const router = express.Router();
const groupItemController = require("../controllers/groupItemController");

router.post("/groupItems", groupItemController.getAllGroupItems);
router.post("/group/items", groupItemController.createGroupItem);
module.exports = router;
