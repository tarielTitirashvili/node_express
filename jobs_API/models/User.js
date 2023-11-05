const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'username must be provided!'],
    minlength: 2,
    maxlength: 25,
  },
  email: {
    type: String,
    required: [true, 'username must be provided!'],
    match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'please provide valid username!'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'username must be password!'],
    minlength: 6,
    maxlength: 50,
  },
});

module.exports = mongoose.model('User', UserSchema);