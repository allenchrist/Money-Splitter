const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [
    {
      name: String,
      amountDue: { type: Number, default: 0 },
      transactions: [
        {
          type: { type: String, enum: ["expense", "payment"], required: true },
          amount: Number,
          date: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Group", groupSchema);
