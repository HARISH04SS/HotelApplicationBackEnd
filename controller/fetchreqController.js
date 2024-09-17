const Request = require('../models/requestSchema');
const fetchreqController = {
    fetch: async (req, res) => {
        try {
            const requests = await Request.find().populate('resident').populate('assignedStaff');
            res.json(requests);
        } catch (error) {
            res.status(500).json({ msg: 'Server error' });
        }
    },
    assignToStaff: async (req, res) => {
            const { staffId } = req.body;
        
            try {
                const request = await Request.findById(req.params.id);
                if (!request) {
                    return res.status(404).json({ msg: 'Request not found' });
                }
        
                request.assignedStaff = staffId;
                request.status = 'in progress';
                await request.save();
        
                res.json({ msg: 'Staff assigned successfully' });
            } catch (error) {
                res.status(500).json({ msg: 'Server error' });
            }
        }
    };


module.exports = fetchreqController;