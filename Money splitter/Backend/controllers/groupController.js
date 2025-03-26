const Group = require("../models/group");

// 🆕 Create Group with Password
exports.createGroup = async (req, res) => {
  try {
    const { groupName, password } = req.body;
    if (!groupName || !password) {
      return res.status(400).json({ message: "Group name and password are required!" });
    }

    const newGroup = new Group({ name: groupName, password, members: [] });
    await newGroup.save();

    res.status(201).json({ message: "Group created successfully!", group: newGroup });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🔐 Fetch Group with Password
exports.getGroup = async (req, res) => {
  try {
    const { groupName, password } = req.body;

    const group = await Group.findOne({ name: groupName });

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    const isMatch = await group.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🏷️ Get All Groups (Without Password Check)
exports.getMyGroups = async (req, res) => {
  try {
    const groups = await Group.find().select("name members");
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ➕ Add a Member to a Group
exports.addMember = async (req, res) => {
  try {
    const { groupId, memberName } = req.body;
    if (!groupId || !memberName) return res.status(400).json({ message: "Invalid input" });

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    group.members.push({ name: memberName, amountDue: 0 });
    await group.save();

    res.status(200).json({ message: "Member added successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 💰 Add Expense and Split Among Members
exports.addExpense = async (req, res) => {
  try {
    const { groupId, amount } = req.body;
    if (!groupId || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
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

// ✅ Pay Amount and Reduce Balance
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

    res.status(200).json({ message: "Payment successful", group });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
