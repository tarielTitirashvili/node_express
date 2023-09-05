const express = require("express");
const { getHomePageData } = require("../controllers/home");
const router = express.Router();

router.get("/", getHomePageData);

module.exports = router;
