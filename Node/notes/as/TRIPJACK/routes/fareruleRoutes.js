const express = require("express");
const router = express.Router();
const { getFareRule } = require("../controller/fareruleController");

// POST endpoint to get fare rules
router.post("/fareRule", getFareRule);

module.exports = router;
