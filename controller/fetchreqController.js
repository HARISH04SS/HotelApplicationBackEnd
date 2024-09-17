const Request = require('../models/requestSchema');
const Staff = require('../models/staffSchema')
const fetchreqController = {
    fetch: async (req, res) => {
        try {
            const requests = await Request.find().populate('resident').populate('assignedStaff');
            res.json(requests);
        } catch (error) {
            res.status(500).json({ msg: 'Server error' });
        }
    },
    getAllStaff : async (req, res) => {
        try {
            const staff = await Staff.find();  
            res.json({ staff });
        } catch (error) {
            res.status(500).json({ msg: 'Failed to fetch staff members' });
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