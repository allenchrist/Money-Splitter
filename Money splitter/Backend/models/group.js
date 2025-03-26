const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 🔐 Group Password
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

// 🔒 Hash password before saving
groupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare hashed password
groupSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Group", groupSchema);
