var express = require('express');
var router = express.Router();
const auth = require('../controllers/auth');

/* GET home page. */

router.get('/login',auth.login);
router.post('/login', auth.postLogin);
router.post('/logout',auth.logout);

module.exports = router;
