const Request = require('../models/requestSchema')

const requestController = {
    request: async (req, res) => {
    const { resident, description } = req.body;

    try {
        const newRequest = new Request({
            resident,
            description
        });

        await newRequest.save();
        res.status(201).json({ msg: 'Request submitted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
}}


module.exports = requestController;