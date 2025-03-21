const Group = require("../models/group");

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    if (!groupName) return res.status(400).json({ message: "Group name is required" });

    const newGroup = new Group({ name: groupName, members: [] });
    await newGroup.save();

    res.status(201).json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all groups
exports.getMyGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a member to a group
const mongoose = require("mongoose");

exports.addMember = async (req, res) => {
  try {
    const { groupId, memberName } = req.body;

    // Check if groupId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    group.members.push({ name: memberName, amountDue: 0 });
    await group.save();

    res.status(200).json({ message: "Member added successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

