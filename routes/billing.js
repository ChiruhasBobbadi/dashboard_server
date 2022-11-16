const express = require('express');
const router = express.Router();
const billing = require('../controllers/billing');

/* GET home page. */

router.post('/bill',billing.billing);
//router.get('/generateInvoice', billing.postLogin);


module.exports = router;
