const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.get("/groups", groupController.getAllGroups);
router.post("/usergroup", groupController.getAllUserGroups);
router.post("/group", groupController.createGroup);
module.exports = router;
