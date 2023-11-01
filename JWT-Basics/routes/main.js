const express = require('express');
const router = express.Router();
//controllers
const { dashboard, login } = require('../controllers/main');

//middleware
const authMiddleWare = require('../middleware/auth');

router.route('/dashboard').get(authMiddleWare, dashboard);
router.route('/login').post(login);

module.exports = router;