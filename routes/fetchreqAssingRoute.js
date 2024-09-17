const express = require('express');
const router = express.Router();
const Request = require('../models/requestSchema');
const fetchreqController = require('../controller/fetchreqController')
router.get('/fetch',fetchreqController.fetch );
router.get('/staff', fetchreqController.getAllStaff);
router.put('/:id/assign', fetchreqController.assignToStaff);

module.exports = router;
