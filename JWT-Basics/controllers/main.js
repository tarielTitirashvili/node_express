const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = (req, res) => {
  const {username: userName, password} = req.body;

  if(!userName || !password) {
    throw new CustomAPIError('please provide username and password', 400);
  }
  // this parameter must be provided from the DB
  const id = new Date().getDate()

  // never send back confidential information
  const token = jwt.sign({id, userName}, process.env.JWT_SECRET_KEY, {expiresIn: '30d'})

  res.status(200).json({msg: 'user created', token});
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, John Doe`, 
    secret: `here is your authorization data, your lucky number is ${luckyNumber}` 
  });
};

module.exports = {
  login,
  dashboard,
}