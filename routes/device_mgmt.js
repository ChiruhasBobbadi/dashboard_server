
const express = require('express');
const router = express.Router();
const device_mgmt = require('../controllers/device_management');
const routeAuth = require('../middleware/routeAuth');



/* GET home page. */

router.post('/addDevice',device_mgmt.addDevice);

router.post('/updateDevice',device_mgmt.updateDevice);

router.post('/deleteDevice',device_mgmt.deleteDevice);

router.post('/allDevices',device_mgmt.getAllDevices);

router.post('/device',device_mgmt.getDevice);

module.exports = router
