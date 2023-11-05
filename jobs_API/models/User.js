const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "username must be provided!"],
    minlength: 2,
    maxlength: 25,
  },
  email: {
    type: String,
    required: [true, "username must be provided!"],
    match: [
      /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      "please provide valid username!",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "username must be password!"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  // from mongoose 5.5 it works without calling next()
  console.log('password', this.password);
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('password', this.password);
});

module.exports = mongoose.model("User", UserSchema);