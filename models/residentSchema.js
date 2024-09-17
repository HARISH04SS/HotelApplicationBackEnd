const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: String,
    role:{
        type: String,
        enum: ['admin', 'resident'],
        default: 'resident'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatesAt:{
        type:Date,
        default:Date.now
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        default: null
    },
    checkIn: {
        type: Date,
        default: null
    },
    checkOut: {
        type: Date,
        default: null
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Partial'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('residents', residentSchema);