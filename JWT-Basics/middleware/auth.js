const jwt = require('jsonwebtoken');
const CustomAPIError = require("../errors/custom-error");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //check if token was provided
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new CustomAPIError('unauthorized', 401);

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id, userName } = decoded;
    req.user = {id, userName};

  } catch (err) {
    CustomAPIError(error.message, error.status);
  };
  next();
};

module.exports = authMiddleWare;