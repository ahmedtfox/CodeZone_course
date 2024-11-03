const mongoose = require("mongoose");
const isEmail = require("validator").isEmail;
const role = require("../utils/roles");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "this is not a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [role.USER, role.ADMIN, role.MANGER],
    default: role.USER,
  },
});

module.exports = mongoose.model("User", userSchema);
