const authorize = (req, res, next) => {
  console.log("authorization");
  req.user = {name: "John", email: "john@gmail.com"};
  next();
};

module.exports = authorize;
