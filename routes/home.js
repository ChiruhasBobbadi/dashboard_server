const express = require('express');
const router = express.Router();
const auth = require('../controllers/home');

/* GET home page. */

router.post('/home',auth.getHome);
//router.post('/login', auth.postLogin);

module.exports = router;
