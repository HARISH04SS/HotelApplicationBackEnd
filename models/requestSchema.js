const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    resident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'residents',  // Assuming you have a Resident model
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedStaff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',  // Assuming you have a Staff model
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Request', requestSchema);
