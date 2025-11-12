const { reviewFlight } = require("../services/tripJack");

const flightReview = async (req, res) => {
  try {
    const { priceIds } = req.body;

    if (!priceIds || !Array.isArray(priceIds) || priceIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "priceIds must be a non-empty array",
      });
    }

    const reviewData = await reviewFlight(priceIds);

    res.status(200).json({
      success: true,
      message: "Flight review fetched successfully",
      data: reviewData,
    });
  } catch (error) {
    console.error("❌ Flight Review Error:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Server error while fetching flight review",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { flightReview };
