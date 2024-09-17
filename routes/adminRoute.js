const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

//Admin register
router.post('/register', adminController.register);

// Admin Login
router.post('/login',adminController.login );
router.post('/logout' ,adminController.logout);

// Create a room
router.post('/create-room', adminController.createroom);

// Delete a room
router.delete('/delete-room/:id',adminController.deleteromm );

// Allocate room to customer and send SMS
router.post('/allocate-room', adminController.allocateroom);

// Deallocate a room
router.post('/deallocate-room',adminController.deallocateroom );

// Check for available rooms
router.get('/available-rooms',adminController.availablerooms );

module.exports = router;
