const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Home " + req.user.name);
});

module.exports = router;