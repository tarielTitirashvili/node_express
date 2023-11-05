const Errors = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const body = req.body;
  console.log(req.body);
  if (!body.name || !body.email || !body.password) {
    throw new Errors.BadRequestError("please provide valid credentials!");
  } else {
    // password hashing is in User model as middleware
    const user = await User.create({ ...req.body });

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  }
};

const login = (req, res) => {
  res.send("user was authenticated!");
};

module.exports = {
  register,
  login,
};
