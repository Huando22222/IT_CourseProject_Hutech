const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  pic: String,
  googleId: String,
  secret: String,
  identity: String,
  password: String,
  admin: String,
});

module.exports = mongoose.model("users", userSchema);
