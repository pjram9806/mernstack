const {getAirlines} = require("../controllers/airlinesController");
const express = require("express");
const router = express.Router();

router.get("/getairlines", getAirlines);

module.exports = router;