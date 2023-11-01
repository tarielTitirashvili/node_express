const jwt = require('jsonwebtoken');
const Error = require("../errors");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //check if token was provided
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new Error.UnAuthenticated('unauthorized', 401);

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id, userName } = decoded;
    req.user = { id, userName };

  } catch (err) {
    throw new Error.UnAuthenticated('not authorized to access this route', 401);
  };
  next();
};

module.exports = authMiddleWare;