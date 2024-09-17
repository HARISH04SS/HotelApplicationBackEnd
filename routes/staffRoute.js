const express = require('express');
const router = express.Router();
const Staff = require('../models/staffSchema');
const Request = require('../models/requestSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const staffController = require('../controller/staffController')

router.post('/staffregister',staffController.staffRegister)


// Staff Login
router.post('/stafflogin', staffController.staffLogin);

// Update Request Status (In Progress/Completed)
router.put('/update-status/:requestId', staffController.updateStatus);

// Mark Staff as Available or Not
router.put('/update-availability/:staffId', staffController.availableStaus);

module.exports = router;
