const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true, unique: true },
    isAvailable: { type: Boolean, default: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'residents', default: null },
    pricePerNight: { type: Number, required: true },
    checkInTime: { type: Date, default: null },
    checkOutTime: { type: Date, default: null }
});

module.exports = mongoose.model('Room', roomSchema);
