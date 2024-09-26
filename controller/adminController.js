const Room = require('../models/roomSchema');
const Resident = require('../models/residentSchema');
const Admin = require('../models/adminSchema');
const twilio = require('twilio');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require("../utils/config");
//const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for port 465, false for other ports
    service: "Gmail",
    auth: {
      user: "harishsubramanian4122001@gmail.com",
      pass: "hkho fwas vlyp xdiy",
    },
  });  
const adminController = {
    register: async (req,res) => {
        try{
            const {username, password} = req.body;
            const admin = await Admin.findOne({username});
            if(admin){
                return res.status(400).json({message:'Admin already exists'});
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const newAdmin = new Admin({username, password: hashedPassword});
            await newAdmin.save();
            res.status(201).json({message:'Admin created succesfully'});
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },


    login: async(req,res) => {
        const {username, password} = req.body;
        const admin = await Admin.findOne({username});
        if(!admin){
            res.status(400).json({message:'Admin not register yet'});
        }
        const validPassword = await bcrypt.compare(password, admin.password);
        if(!validPassword){
            res.status(400).json({message:'invaild password'});
        }
            const token = jwt.sign({id:admin._id},jwt_secret);
            res.cookie('token',token,{
                httpOnly: true,
                sameSite: "none",
                secure: true
            });
            res.json({message:"login succesful"});
    },

    logout: async(req,res)=>{
        res.clearCookie('token').json({message:"logout succesful"})
    },

    createroom: async (req, res) => {
        const { roomNumber, pricePerNight } = req.body;
        const newRoom = new Room({ roomNumber, pricePerNight });
        await newRoom.save();
        res.json({ msg: 'Room created successfully' });
    },

    deleteromm: async (req, res) => {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Room deleted successfully' });
    },

    allocateroom: async (req, res) => {
        const { residentId, roomId } = req.body;
    
        try {
            const room = await Room.findById(roomId);
            const resident = await Resident.findById(residentId);
    
            if (!room || !resident) {
                return res.status(400).json({ msg: 'Invalid room or resident ID' });
            }
    
            if (!room.isAvailable) {
                return res.status(400).json({ msg: 'Room not available' });
            }
    
            room.assignedTo = residentId;
            room.isAvailable = false;
            await room.save();

            resident.room = roomId;
            resident.checkIn = new Date();  
            await resident.save();          
    
            // await client.messages.create({
            //     body: `Room ${room.roomNumber} assigned to you. Contact us for any queries.`,
            //     from: process.env.TWILIO_PHONE_NUMBER,
            //     to: resident.phoneNumber 
            // });
            // const info = await transporter.sendMail({
            //     from: 'harishsubramanian4122001@gmail.com', 
            //     to: resident.email, 
            //     subject: `Room ${room.roomNumber} Allocation`, // Use backticks
            //     text: `Dear ${resident.name},\n\nYour room ${room.roomNumber} has been successfully allocated. Please contact us if you have any questions.\n\nBest regards,\nThe Admin Team`, // Use backticks
            //     html: `<b><img src="https://i.pinimg.com/originals/c9/bc/00/c9bc002f6ba5a5bcab6dbbcf1301835f.png"/></b>`, // Corrected quotes for img src
            // });
            const info = await transporter.sendMail({
                from: 'harishsubramanian4122001@gmail.com', 
                to: resident.email, 
                subject: `Room number ${room.roomNumber} Allocation`, 
                text: `Dear ${resident.name},\n\nYour room ${room.roomNumber} has been successfully allocated. Please contact us if you have any questions.\n\nBest regards,\nThe Admin Team`,
                html: `
                    <p>Dear ${resident.name},</p>
                    <p>Your room number <b>${room.roomNumber}</b> has been successfully allocated.</p>
                    <p>Please contact us if you have any questions.</p>
                    <br/>
                    <p>Best regards,<br/>The Admin Team</p>
                    <br/>
                    <img src="https://i.pinimg.com/originals/c9/bc/00/c9bc002f6ba5a5bcab6dbbcf1301835f.png" alt="Logo"/> <!-- Corrected HTML structure -->
                `, 
            });
            
            
              console.log("Message sent: %s", info.messageId);
    
            res.json({ msg: 'Room assigned and message sent' });
        } catch (error) {
            console.error('Error in room allocation:', error);
            res.status(500).json({ msg: 'Server error' });
        }
    },
    

    deallocateroom: async (req, res) => {
        const { residentId, roomId } = req.body;
        
        try {
            const room = await Room.findById(roomId);
            const resident = await Resident.findById(residentId);
    
            if (!room || !resident) {
                return res.status(404).json({ msg: 'Room or Customer not found' });
            }
    
            if (room.assignedTo.toString() !== residentId.toString()) {
                return res.status(400).json({ msg: 'Room is not allocated to this customer' });
            }
            room.isAvailable = true;
            room.assignedTo = null;
            resident.room = null;
    
            await room.save();
            await resident.save();
    
            res.json({ msg: 'Room deallocated successfully' });
        } catch (err) {
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    },

    availablerooms: async (req, res) => {
        try {
            const availableRooms = await Room.find({ isAvailable: true });
            
            if (availableRooms.length === 0) {
                return res.json({ msg: 'No rooms are available right now' });
            }
    
            res.json({ availableRooms });
        } catch (err) {
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    }

}


module.exports = adminController;