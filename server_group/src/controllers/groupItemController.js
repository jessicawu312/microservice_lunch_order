const GroupItem = require("../models/groupItemModel");

exports.getAllGroupItems = async (req, res) => {
  try {
    const { groupId } = req.body;
    const groupItems = await GroupItem.listAll(groupId);
    res.json({ success: true, data: groupItems });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error! Failed to list all group items.",
    });
  }
};

exports.createGroupItem = async (req, res) => {
  try {
    const { items, group_id } = req.body;

    const data = [];
    for (let i = 0; i < items.length; i++) {
      data.push([items[i].name, items[i].price, group_id]);
    }
    const result = await GroupItem.create(data);

    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to create group item." });
    }
    res.json({
      success: true,
      message: "Group item create successfully.",
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        error: "Server Error! Failed to create group item.",
      });
  }
};
