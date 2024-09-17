const Resident = require("../models/residentSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require("../utils/config");
const authController = {
    register: async (req,res) => {
        try{
            const {name, email, phoneNumber, password} = req.body;
            const resident = await Resident.findOne({email});
            if(resident){
                return res.status(400).json({message:'Resident already exists'});
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const newResident = new Resident({name, email, phoneNumber, password: hashedPassword});
            await newResident.save();
            res.status(201).json({message:'Resident created succesfully'});
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    // login: async(req,res) => {
    //     const {email, password} = req.body;
    //     const resident = await Resident.findOne({email});
    //     if(!resident){
    //         res.status(400).json({message:'Residant not register yet'});
    //     }
    //     const validPassword = await bcrypt.compare(password,resident.password);
    //     if(!validPassword){
    //         res.status(400).json({message:'invaild password'});
    //     }
    //         const token = jwt.sign({id:resident._id},jwt_secret);
    //         res.cookie('token',token,{
    //             httpOnly: true,
    //             sameSite: "none",
    //             secure: true
    //         });
    //         res.json({message:"login succesful"});
    // },
    login: async (req, res) => {
        const { email, password } = req.body;
        const resident = await Resident.findOne({ email });
        if (!resident) {
            return res.status(400).json({ message: 'Resident not registered yet' });
        }
        const validPassword = await bcrypt.compare(password, resident.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: resident._id }, jwt_secret);
        // res.cookie('token', token, {
            httpOnly: true,
            // sameSite: 'None', // Ensure cookies are sent across sites
            // secure: true,    // Ensure cookies are sent over HTTPS
       // });
        res.json({ message: 'Login successful' ,token});
    },
    logout: async(req,res)=>{
        res.clearCookie('token').json({message:"logout succesful"})
    }
}

module.exports = authController;