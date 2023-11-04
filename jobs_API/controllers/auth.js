const register = (req, res) => {
  res.send("user was registered!");
};

const login = (req, res) => {
  res.send("user was authenticated!");
};

module.exports = {
  register,
  login,
};
