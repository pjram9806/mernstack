const { getSeatMap } = require("../services/tripJack");

const fetchSeatMap = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ success: false, message: "bookingId is required" });
    }

    const seatMapData = await getSeatMap(bookingId);

    if (!seatMapData) {
      return res.status(404).json({ success: false, message: "No seat map found" });
    }

    res.status(200).json({
      success: true,
      message: "Seat map fetched successfully",
      bookingId,
      data: seatMapData,
    });
  } catch (error) {
    console.error("❌ Seat Map Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching seat map",
      error: error.response?.data || error.message,
    });
  }
};  

module.exports = { fetchSeatMap };
