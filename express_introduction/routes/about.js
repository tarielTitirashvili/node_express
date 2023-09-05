const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  res.json("About page");
});

module.exports = router