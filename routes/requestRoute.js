const express = require('express');
const router = express.Router();
const Request = require('../models/requestSchema');
const requestController = require('../controller/requestController');

// Resident submits a request
router.post('/request', requestController.request);

module.exports = router;
