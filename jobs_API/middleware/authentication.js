const Errors = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Errors.UnauthenticatedError("unauthenticated");
  } else {
    const providedToken = token.split(" ")[1];
    try {
      const tokenData = jwt.verify(providedToken, process.env.JWT_SECRET_KEY);
      req.user = { userId: tokenData.userId, name: tokenData.name };
    } catch (e) {
      throw new Errors.UnauthenticatedError("unauthenticated");
    }
  }
  next();
};
