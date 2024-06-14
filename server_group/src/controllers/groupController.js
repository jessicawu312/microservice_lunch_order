const Group = require("../models/groupModel");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.listAll();
    res.json({ success: true, data: groups });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error! Failed to list all group.",
    });
  }
};

exports.getAllUserGroups = async (req, res) => {
  try {
    const { user_id } = req.body;
    const groups = await Group.listUserGroup(user_id);
    res.json({ success: true, data: groups });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error! Failed to list all user's group.",
    });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name, place, owner } = req.body;
    const result = await Group.create(name, place, owner);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to create group." });
    }
    res.json({
      data: result.data,
      success: true,
      message: "Group create successfully.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server Error! Failed to create group." });
  }
};
