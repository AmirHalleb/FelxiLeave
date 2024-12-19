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
