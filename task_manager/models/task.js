const mongoose = require("mongoose");
const { stringLength } = require("../utils/models");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must Provide a name For Task'],
    trim: true, // removes spaces from start and end
    maxlength: [stringLength, `name cann\'t be more then ${stringLength} characters`]
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);