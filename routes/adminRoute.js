const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.post('/register', adminController.register);

router.post('/login',adminController.login );
router.post('/logout' ,adminController.logout);

router.post('/create-room', adminController.createroom);

router.delete('/delete-room/:id',adminController.deleteromm );

router.post('/allocate-room', adminController.allocateroom);

router.post('/deallocate-room',adminController.deallocateroom );

router.get('/available-rooms',adminController.availablerooms );

module.exports = router;
