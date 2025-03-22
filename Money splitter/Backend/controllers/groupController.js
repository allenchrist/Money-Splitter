const Group = require("../models/group");
//const mongoose = require("mongoose");
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
exports.addExpense = async (req, res) => {
  try {
    const { groupId, amount } = req.body;

    if (!groupId || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid group ID or amount" });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (group.members.length === 0) {
      return res.status(400).json({ message: "No members in the group to split" });
    }

    const splitAmount = parseFloat(amount) / group.members.length;
    group.members.forEach((member) => {
      member.amountDue += splitAmount;
    });

    await group.save();
    res.json({ message: "Expense added successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Pay amount and reduce balance
exports.payAmount = async (req, res) => {
  try {
    const { groupId, memberName, amount } = req.body;

    if (!groupId || !memberName || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const member = group.members.find((m) => m.name === memberName);
    if (!member) return res.status(404).json({ message: "Member not found" });

    member.amountDue = Math.max(0, member.amountDue - amount);
    await group.save();

    console.log(`Payment successful: ${memberName} paid ${amount} in group ${groupId}`);

    res.status(200).json({ message: "Payment successful", group });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
