const Errors = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
  const body = req.body;
  console.log(req.body);
  if (!body.name || !body.email || !body.password) {
    throw new Errors.BadRequestError("please provide valid credentials!");
  } else {
    // password hashing is in User model as middleware
    const user = await User.create({...req.body});
    res.status(StatusCodes.CREATED).json({ msg: "user was registered!", user });
  }
};

const login = (req, res) => {
  res.send("user was authenticated!");
};

module.exports = {
  register,
  login,
};
