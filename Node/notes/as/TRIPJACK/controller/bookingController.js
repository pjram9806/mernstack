const { reviewFlight, bookFlight, getBookingDetails } = require("../services/tripJack");

const bookFlightController = async (req, res) => {
  try {
    const { priceId, paymentInfos, travellerInfo, gstInfo, deliveryInfo } = req.body;

    // Validate required fields
    if (!priceId || !paymentInfos?.length || !travellerInfo?.length) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: priceId, paymentInfos, travellerInfo",
      });
    }

    // 🧹 Clean GST number (remove spaces)
    if (gstInfo?.gstNumber) {
      gstInfo.gstNumber = gstInfo.gstNumber.trim();
      // Optional GST regex validation
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(gstInfo.gstNumber)) {
        return res.status(400).json({
          success: false,
          message: "Invalid GSTIN format. It must be 15 characters and valid format.",
        });
      }
    }

    // Step 1️⃣: Review Flight → get bookingId
    const reviewResponse = await reviewFlight([priceId]);
    const bookingId = reviewResponse?.bookingId;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Review failed - bookingId not generated",
        errors: reviewResponse?.errors || [],
      });
    }

    console.log("✅ BookingID generated:", bookingId);
    console.log("📦 Sending GST info:", JSON.stringify(gstInfo, null, 2));

    // Step 2️⃣: Book Flight
    const bookingPayload = {
      bookingId,
      paymentInfos,
      travellerInfo,
      deliveryInfo,
      ...(gstInfo && { gstInfo }),
    };

    console.log("📩 Final Payload sent to TripJack:", JSON.stringify(bookingPayload, null, 2));

    const bookResponse = await bookFlight(bookingPayload);

    // Step 3️⃣: Validate TripJack booking response
    if (!bookResponse?.status?.success) {
      return res.status(400).json({
        success: false,
        message: "Booking failed",
        errors: bookResponse?.errors || [],
        data: bookResponse,
      });
    }

    // ✅ Success
    res.json({
      success: true,
      message: "Booking successful",
      bookingId,
      data: bookResponse,
    });

  } catch (error) {
    console.error("❌ Book Flight Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Server error while booking flight",
      error: error.response?.data || error.message,
    });
  }
};

const bookingDetailsController = async (req, res) => {
  try {
    const { bookingRef, bookingId } = req.body;

    if (!bookingRef && !bookingId) {
      return res.status(400).json({ success: false, message: "bookingRef or bookingId is required" });
    }

    const reference = bookingRef || bookingId;
    const detailsResponse = await getBookingDetails(reference);

    if (!detailsResponse?.status?.success) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch booking details",
        errors: detailsResponse?.errors || [],
        data: detailsResponse,
      });
    }

    res.json({
      success: true,
      message: "Booking details fetched successfully",
      bookingRef: detailsResponse?.bookingRef,
      bookingId: detailsResponse?.bookingId,
      data: detailsResponse,
    });
  } catch (error) {
    console.error("❌ Booking Details Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching booking details",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { bookFlightController, bookingDetailsController };
