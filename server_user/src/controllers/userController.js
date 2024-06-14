const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.listAll();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error! Failed to list all user.",
    });
  }
};

exports.createUsers = async (req, res) => {
  try {
    const { name, number, password } = req.body;
    const result = await User.create(name, number, password);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to create user." });
    }
    res.json({ success: true, message: "User create successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server Error! Failed to create user." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const result = await User.login(name, password);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to authenticate user." });
    }
    res.json({
      data: result.data,
      success: true,
      message: "User authenticate successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error! Failed to authenticate user.",
    });
  }
};
