var express = require('express');
var router = express.Router();
const configure = require('../controllers/control_configure');

/* GET home page. */

router.post('/startDevice',configure.changeStateToStart);
router.post('/stopDevice', configure.changeStateToStop);
router.get('/allDevices',configure.getAllDevices)

module.exports = router;
