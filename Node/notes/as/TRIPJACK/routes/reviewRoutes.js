const express = require('express');
const router = express.Router();
const {flightReview} = require('../controller/reviewController');

router.post('/review',flightReview);

module.exports = router;