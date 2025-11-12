const express = require("express");
const router = express.Router();
const { createPassengerBooking,getPassengerBooking } = require("../controller/tripPlanController");

router.post("/tripbook", createPassengerBooking);
router.get("/getbooking/:Id", getPassengerBooking);

module.exports = router;
