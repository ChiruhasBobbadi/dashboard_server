
const express = require('express');
const router = express.Router();
const device_mgmt = require('../controllers/device_management');

/* GET home page. */

router.post('/addDevice',device_mgmt.addDevice);



module.exports = router
