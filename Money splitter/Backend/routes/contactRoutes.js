const express = require("express");
const router = express.Router();
const { submitContactForm } = require("../controllers/contactController");

// POST route for submitting contact messages
router.post("/", submitContactForm);

module.exports = router;
