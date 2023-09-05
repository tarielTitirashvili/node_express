const getHomePageData = (req, res) => {
  res.json("Home " + req.user.name);
}

module.exports = {
  getHomePageData
}