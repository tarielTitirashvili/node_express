const express = require("express");
const { getAboutPageData } = require("../controllers/about");
const router = express.Router();

router.get("/", getAboutPageData);

module.exports = router;
