const Errors = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Errors.UnauthenticatedError("Unauthenticated");
  } else {
    const providedToken = authHeader.split(" ")[1];
    try {
      const tokenData = jwt.verify(providedToken, process.env.JWT_SECRET_KEY);
      req.user = { userId: tokenData.userId, name: tokenData.name };
      next();
    } catch (e) {
      throw new Errors.UnauthenticatedError("Unauthenticated");
    }
  }
};

module.exports = authMiddleWare;