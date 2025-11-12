const {generateOtp,validateOtp} = require('../controllers/employeeOtpController');
const express = require('express');
const router = express.Router();

router.post('/insertotp',generateOtp);
router.get('/validateotp',validateOtp);


module.exports = router;