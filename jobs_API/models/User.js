const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    typeof: 'string',
    required: [true, 'username must be provided!'],
    minlength: 2,
    maxlength: 25,
  },
  email: {
    typeof: 'string',
    required: [true, 'username must be provided!'],
    match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'please provide valid username!'],
    unique: 'true'
  },
  password: {
    typeof: 'string',
    required: [true, 'username must be password!'],
    minlength: 6,
    maxlength: 50,
  },
});

module.exports = mongoose.model('User', UserSchema);