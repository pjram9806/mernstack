const {getAirports,insertAirport} =require("../controllers/airportsController");
const express = require("express");
const router = express.Router();

// GET /airports?searchTerm=xyz
router.get("/getairports", getAirports);

// POST /airports
router.post("/insert", insertAirport);

module.exports = router;