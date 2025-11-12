const { fareRule } = require("../services/tripJack");

const getFareRule = async (req, res) => {
  try {
    const { id, flowType } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "id is required (priceId/bookingId)" });
    }

    const response = await fareRule(id, flowType || "SEARCH");

    if (!response?.fareRule) {
      return res.status(404).json({ success: false, message: "No fare rules found" });
    }

    const sector = Object.keys(response.fareRule)[0];
    const fr = response.fareRule[sector]?.fr || {};

    res.status(200).json({
      success: true,
      message: "Fare rules fetched successfully",
      sector,
      cancellationFee:
        (fr.CANCELLATION?.DEFAULT?.amount || 0) +
        (fr.CANCELLATION?.DEFAULT?.additionalFee || 0),
      dateChangeFee:
        (fr.DATECHANGE?.DEFAULT?.amount || 0) +
        (fr.DATECHANGE?.DEFAULT?.additionalFee || 0),
      raw: response.fareRule,
    });
  } catch (error) {
    console.error("❌ Fare Rule Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching fare rules",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { getFareRule };
