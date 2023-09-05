const express = require('express');

const router = express.Router();

router.post("/", (req, res) => {
  if (req?.body?.name) {
    const name = req?.body?.name;
    res.status(200).json('welcome ' + name);
  } else
    return res.status(401).json('please provide a name');
});

module.exports = router
