const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [
    {
      name: String,
      amountDue: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Group", groupSchema);
