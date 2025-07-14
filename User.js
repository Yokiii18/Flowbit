const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  customerId: { type: String },
  role: { type: String, enum: ["Admin", "Customer"], default: "Customer" },
});

module.exports = mongoose.model("User", UserSchema);
