const express = require('express');
const router = express.Router();
const Request = require('../models/requestSchema');
const fetchreqController = require('../controller/fetchreqController')
// Admin fetches all requests
router.get('/fetch',fetchreqController.fetch );

// Admin assigns staff to a request
router.put('/:id/assign', fetchreqController.assignToStaff);

module.exports = router;
