const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);
router.post("/user", userController.createUsers);
router.post("/login", userController.loginUser);

module.exports = router;
