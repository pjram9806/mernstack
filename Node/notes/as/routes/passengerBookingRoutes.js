const express = require("express");
const router = express.Router();
const {
  postBooking,getBooking,getBookingFlexible
} = require("../controllers/passengerBookingController");

// ===========================
//  Flight Booking Routes
// ===========================

/**
 * @route   POST /api/flights/passengerbooking
 * @desc    Create a new booking (Insert full payload)
 * @access  Public / Application-level
 */
router.post("/passengerbooking", postBooking);

/**
 * @route   GET /api/flights/passengerbooking/:id
 * @desc    Fetch booking details by BookingID
 * @access  Public / Application-level
 */
router.get("/getpassenger/:id", getBooking);

/**
 * @route   GET /api/flights/booking
 * @desc    Fetch booking by bookingRef or userId (query-based)
 * @example /api/flights/booking?bookingRef=TJ12345
 * @example /api/flights/booking?userId=10
 */

module.exports = router;
