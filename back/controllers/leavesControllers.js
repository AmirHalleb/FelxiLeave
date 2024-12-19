const { Leave } = require('../models');

const getUserLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      where: {
        userId: req.user.id,
      },
    });

    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ error: 'No leaves found for the user' });
    }

    res.json(leaves); // Send the leaves data back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching leaves' });
  }
};

module.exports = {
  getUserLeaves,
};
exports.acceptLeave = async (req, res) => {
  try {
    const { id } = req.params; // Get leave ID from the URL parameters

    // Check if the leave exists
    const leave = await Leave.findByPk(id);
    if (!leave) {
      return res.status(404).json({ error: 'Leave request not found.' });
    }

    // Update the leave status to 1
    leave.status = 1;
    await leave.save();

    return res.status(200).json({
      message: 'Leave status updated successfully.',
      leave,
    });
  } catch (error) {
    console.error('Error updating leave status:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
exports.rejectLeave = async (req, res) => {
    try {
      const { id } = req.params; // Get leave ID from the URL parameters
  
      // Check if the leave exists
      const leave = await Leave.findByPk(id);
      if (!leave) {
        return res.status(404).json({ error: 'Leave request not found.' });
      }
  
      // Update the leave status to 2
      leave.status = 2;
      await leave.save();
  
      return res.status(200).json({
        message: 'Leave status updated successfully.',
        leave,
      });
    } catch (error) {
      console.error('Error updating leave status:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };
