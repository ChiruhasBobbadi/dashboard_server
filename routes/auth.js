var express = require('express');
var router = express.Router();
const auth = require('../controllers/auth');

/* GET home page. */


router.post('/addUser',auth.login);
router.post('/deleterUser',auth.deleteUser);
router.post('/login', auth.postLogin);
router.post('/logout',auth.logout);


router.get('/getAllUsers', auth.getAllUsers);

router.post('/adminSignup',auth.adminSignup);

module.exports = router;
