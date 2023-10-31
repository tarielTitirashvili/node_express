

const login = (req, res) => {
  res.send('fake data/login');
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