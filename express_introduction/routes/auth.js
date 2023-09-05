const express = require("express");
const { checkAuthStatus } = require("../controllers/auth");
const router = express.Router();

router.post("/", checkAuthStatus);

module.exports = router;
