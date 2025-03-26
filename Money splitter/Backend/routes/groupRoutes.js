const express = require("express");
const {
  createGroup,
  getGroup,
  getMyGroups,
  addMember,
  addExpense,
  payAmount,
} = require("../controllers/groupController");

const router = express.Router();

router.post("/create", createGroup); // Create group with password
router.post("/get", getGroup); // Fetch group with password
router.get("/my-groups", getMyGroups); // Get all groups (without passwords)
router.post("/add-member", addMember); // Add member
router.post("/add-expense", addExpense); // Add expense
router.put("/pay-amount", payAmount); // Pay amount

module.exports = router;
