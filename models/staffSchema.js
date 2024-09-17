const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    email: { 
        type: String,
         required: true,
          unique: true
         },
    password: String,
    phoneNumber: { 
        type:  String,
         required:true },
    role: { 
        type: String, 
        required: true 
    },
    isAvailable: {
         type: Boolean, 
         default: true 
        },
     status: { 
            type: String, 
            enum: ['In Progress', 'Completed', 'Pending'], 
            default: 'Pending' 
        }
});

module.exports = mongoose.model('Staff', staffSchema);
