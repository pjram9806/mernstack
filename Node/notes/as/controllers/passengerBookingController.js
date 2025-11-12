const { createBooking, getBookingById } = require("../models/passengerBookingModel");

const postBooking = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== "object" || !Object.keys(payload).length)
      return res.status(400).json({ success: false, message: "Request body cannot be empty" });

    const result = await createBooking(payload);
    if (!result.success)
      return res.status(500).json({ success: false, message: "Failed to insert booking", error: result.error });

    return res.status(201).json({ success: true, data: result.data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// =======================================
// GET - Fetch by BookingID (legacy route)
// =======================================
const getBooking = async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    if (isNaN(bookingId)) {
      return res.status(400).json({ success: false, message: "Invalid Booking ID" });
    }

    const result = await getBookingById(bookingId);
    if (!result.success) {
      return res.status(404).json({ success: false, message: result.error });
    }

    res.json(result);
  } catch (err) {
    console.error("❌ [getBooking] Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// =======================================
// GET - Fetch by bookingRef or userId (new route)
// =======================================
const getBookingFlexible = async (req, res) => {
  try {
    const { bookingRef, userId } = req.query;

    if (!bookingRef && !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide either bookingRef or userId",
      });
    }

    const result = await getBookingFull({ bookingRef, userId });

    if (!result.success) {
      return res.status(404).json({ success: false, message: result.error });
    }

    res.json(result);
  } catch (err) {
    console.error("❌ [getBookingFlexible] Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  postBooking,
  getBooking,
  getBookingFlexible,
};