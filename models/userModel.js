const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username must be valid."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be valid."],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
