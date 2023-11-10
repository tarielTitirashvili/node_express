const Errors = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const body = req.body;
  if (!body.name || !body.email || !body.password) {
    throw new Errors.BadRequestError("please provide valid credentials!");
  } else {
    // password hashing is in User model as middleware
    const user = await User.create({ ...req.body });

    const token = user.CreateJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Errors.BadRequestError("please provide valid credentials!");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Errors.BadRequestError("user not found");
  } else {
    const isPasswordCorrect = await user.ComparePassword(password);
    if (!isPasswordCorrect) {
      throw new Errors.UnauthenticatedError("Email or password mismatch");
    } else {
      const token = user.CreateJWT();
      res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
    }
  }
};

module.exports = {
  register,
  login,
};
