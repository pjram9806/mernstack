const express = require("express");
const router = express.Router();
const { fetchSeatMap } = require("../controller/seatController");

router.post("/seatmap", fetchSeatMap);

module.exports = router;
