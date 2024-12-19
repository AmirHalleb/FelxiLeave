// routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware'); // Import the authenticate middleware
const leaveController = require('../controllers/leavesControllers'); // Import the leave controller
const adminleaveController = require('../controllers/adminleavesControllers'); // Import the leave controller


router.get('/user', authenticate, leaveController.getUserLeaves);
router.get('/admin', authenticate, adminleaveController.getAllEmployeeLeaves);



module.exports = router;


