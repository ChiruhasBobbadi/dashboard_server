const express = require('express');
const router = express.Router();
const service = require('../controllers/service');

router.post('/service',service.createServiceRequest);

router.get('/getAllServiceRequests',service.getAllServiceRequests)

router.post('/markResolved',service.markResolved);


module.exports = router;
