const express = require("express");
const { createGroup, getMyGroups, addMember } = require("../controllers/groupController");

const router = express.Router();

router.post("/create", createGroup);
router.get("/my-groups", getMyGroups);
router.post("/add-member", addMember);

module.exports = router;
