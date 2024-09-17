const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    resident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'residents',  
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedStaff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',  
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
