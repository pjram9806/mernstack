const {searchFlights} = require('../controller/flightController');
const express = require('express');
const router = express.Router();

router.post('/search',searchFlights);

module.exports = router;