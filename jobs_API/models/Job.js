const Mongoose = require("mongoose");

const JobSchema = Mongoose.createSchema(
  {
    company: {
      type: String,
      required: [true, "Company name is required!"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "position name is required!"],
      maxLength: 50,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending", "heired"],
    },
    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user must be authenticated"],
    },
  },
  { timeStamps: true }
);

module.exports = Mongoose.model("Job", JobSchema);
