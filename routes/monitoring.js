

const express = require('express');
const router = express.Router();
const const routeAuth = require('../middleware/routeAuth');

const monitoring = require('../controllers/monitoring');

/* GET home page. */

router.get('/devices',monitoring.getDeviceInformation);



module.exports = router
