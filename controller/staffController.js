const Staff = require('../models/staffSchema');
const bcrypt = require('bcrypt');
const Room = require('../models/roomSchema');
const Resident = require('../models/residentSchema');
const Admin = require('../models/adminSchema');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require("../utils/config");
const Request = require('../models/requestSchema');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const staffController = {
    staffRegister :async(req,res)=>{
              try{
                const {name, email, password, phoneNumber, role} =req.body;
                const staff = await Staff.findOne({email});
                if(staff){
                    return res.status(400).json({message:'staff already exists'});
                }
                const hashedPassword = await bcrypt.hash(password,10);
                const newStaff = new Staff({name, email, password: hashedPassword, phoneNumber, role});
                await newStaff.save();
                res.status(201).json({message:'Staff created succesfully'});
            }catch(error){
                res.status(500).json({message:error.message})
            }
        },
    staffLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!jwt_secret) {
                throw new Error('JWT_SECRET is not defined');
            }
    
            const staff = await Staff.findOne({ email });
            if (!staff) return res.status(400).json({ msg: 'Staff not found' });
    
            const isMatch = await bcrypt.compare(password, staff.password);
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    
            const token = jwt.sign({ id: staff._id }, jwt_secret, { expiresIn: '1h' });
            res.json({ token, staff });
        } catch (error) {
            // Log the error with a specific message
            console.error('Staff Login Error:', error.message, error.stack);
            res.status(500).json({ message: 'Internal server error. Please try again later.' });
          }
    },

    getAssignedRequests: async (req, res) => {
        const staffId = req.params.staffId;
    
        try {
            const requests = await Request.find({ assignedStaff: staffId });
            if (!requests || requests.length === 0) {
                return res.status(404).json({ msg: 'No requests assigned to this staff member' });
            }
    
            res.json(requests);
        } catch (err) {
            console.error('Error fetching assigned requests:', err);
            res.status(500).json({ msg: 'Server error' });
        }
    },
    
    updateStatus : async (req, res) => {
        const {requestId} = req.params;
        const { status } = req.body;
    
        const validStatuses = ['pending', 'in progress', 'completed'];
    
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ msg: `Invalid status value: ${status}` });
        }
    
        try {
            const request = await Request.findById(requestId);
            if (!request) return res.status(404).json({ msg: 'Request not found' });
    
            request.status = status;
            await request.save();
    
            res.json({ msg: 'Request status updated', request });
        } catch (err) {
            console.error('Error updating status:', err);
            res.status(500).json({ msg: 'Server error' });
        }
    },
    
    availableStaus:async (req, res) => {
        const { isAvailable } = req.body;
        try {
            const staff = await Staff.findById(req.params.staffId);
            if (!staff) return res.status(404).json({ msg: 'Staff not found' });
    
            staff.isAvailable = isAvailable;
            await staff.save();
            res.json({ msg: 'Staff availability updated', staff });
        } catch (err) {
            res.status(500).json({ msg: 'Server error' });
        }
    }

    
    
    
    
}


module.exports = staffController;