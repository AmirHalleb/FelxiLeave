const { Leave, User } = require('../models');

const getAllEmployeeLeaves = async (req, res) => {
  try {
    // Check if the user is an admin
    console.log(req.user.type);
    if (req.user.type !== true ) { // Assuming type 1 is for admin
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    // Fetch all leave records with associated user details
    const leaves = await Leave.findAll({
      include: [
        {
          model: User,
          attributes: [
            'userId',
            'userName',
            'email',
            'phoneNumber',
            'annualLeave',
            'unpaidLeave',
            'sickLeave',
          ], // Select specific user attributes
        },
      ],
      order: [['startDate', 'ASC']], // Sort leaves by start date
    });

    // Handle no leave records found
    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ error: 'No leave records found.' });
    }

    // Send the leaves data to the admin
    res.json(leaves);
  } catch (error) {
    console.error('Error fetching leave records:', error);
    res.status(500).json({ error: 'Server error while fetching leave records.' });
  }
};

module.exports = {
  getAllEmployeeLeaves,
};
