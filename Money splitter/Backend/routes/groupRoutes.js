const express = require("express");
const { createGroup, getMyGroups, addMember, addExpense, payAmount } = require("../controllers/groupController");
const router = express.Router();

router.post("/create", createGroup);
router.get("/my-groups", getMyGroups);
router.post("/add-member", addMember);
router.post("/add-expense", addExpense);
router.put("/pay-amount", payAmount);
module.exports = router;