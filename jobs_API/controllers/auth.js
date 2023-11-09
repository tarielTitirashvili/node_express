const Errors = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
// const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const body = req.body;
  if (!body.name || !body.email || !body.password) {
    throw new Errors.BadRequestError("please provide valid credentials!");
  } else {
    // password hashing is in User model as middleware
    const user = await User.create({ ...req.body });

    const token = user.CreateJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if(!email || !password) {
    throw new Errors.BadRequestError("please provide valid credentials!")
  };
  const user = await User.find({email});
  if(user.length === 0) {
    throw new Errors.BadRequestError("user not found");
  }else{
    console.log(user);
  }
  res.send("user was authenticated!");
};

module.exports = {
  register,
  login,
};
