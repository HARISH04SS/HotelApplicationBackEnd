const express = require('express');
const router = express.Router();
const Staff = require('../models/staffSchema');
const Request = require('../models/requestSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const staffController = require('../controller/staffController')

router.post('/staffregister',staffController.staffRegister)

router.post('/stafflogin', staffController.staffLogin);

router.patch('/update-status/:requestId', staffController.updateStatus);

router.get('/getAssignedRequests/:staffId',staffController.getAssignedRequests)

router.put('/update-availability/:staffId', staffController.availableStaus);

module.exports = router;
