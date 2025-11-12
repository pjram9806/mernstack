const express = require("express");
const router = express.Router();
const { bookFlightController, bookingDetailsController } = require("../controller/bookingController");

router.post("/book", bookFlightController);
router.post("/booking-details", bookingDetailsController);

module.exports = router;
