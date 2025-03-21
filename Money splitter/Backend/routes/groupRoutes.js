const express = require("express");
const router = express.Router();
const Group = require("../models/group"); // Import Group model
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to protect routes

// Create a group
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { groupName } = req.body;
    if (!groupName) return res.status(400).json({ message: "Group name is required" });

    const newGroup = new Group({
      name: groupName,
      createdBy: req.user.id, // User who created the group
      members: [],
    });

    await newGroup.save();
    res.status(201).json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all groups created by the user
router.get("/my-groups", authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find({ createdBy: req.user.id });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
