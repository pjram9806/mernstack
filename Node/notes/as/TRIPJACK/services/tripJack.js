require("dotenv").config();
const axios = require("axios");

const TRIPJACK_BASE_URL = process.env.TRIPJACK_BASE_URL;
const TRIPJACK_API_KEY = process.env.TRIPJACK_API_KEY;

// 🔹 Generic TripJack POST request wrapper
const callTripJack = async (endpoint, payload) => {
  try {
    const url = `${TRIPJACK_BASE_URL}${endpoint}`;
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        apikey: TRIPJACK_API_KEY,
      },
      timeout: 20000, // 20 seconds
    });

    if (process.env.DEBUG === "true") {
      console.log(`✅ TripJack Response [${endpoint}]:`, JSON.stringify(response.data, null, 2));
    }

    return response.data;
  } catch (err) {
    console.error(`❌ TripJack API Error [${endpoint}]:`, err.response?.data || err.message);
    throw err;
  }
};

// 🔹 Review Flight (TripJack expects array for priceIds)
const reviewFlight = async (priceIds) => {
  if (!Array.isArray(priceIds) || priceIds.length === 0) {
    throw new Error("priceIds must be a non-empty array");
  }

  const payload = { priceIds };

  if (process.env.DEBUG === "true") {
    console.log("📩 Review Payload:", JSON.stringify(payload, null, 2));
  }

  return callTripJack("/fms/v1/review", payload);
};

// 🔹 Seat Map
const getSeatMap = async (bookingId) => {
  if (!bookingId) throw new Error("bookingId is required for seat map");
  return callTripJack("/fms/v1/seat", { bookingId });
};

// 🔹 Fare Rule
const fareRule = async (id, flowType = "SEARCH") => {
  if (!id) throw new Error("id is required for fare rules");
  return callTripJack("/fms/v2/farerule", { id, flowType });
};

// 🔹 Book Flight (Main Booking Endpoint)
const bookFlight = async ({
  bookingId,
  paymentInfos,
  travellerInfo,
  gstInfo,
  deliveryInfo,
  seatSelections,
  ssrSelections,
}) => {
  const payload = {
    bookingId,
    paymentInfos,
    travellerInfo,
    gstInfo,
    deliveryInfo,
    seatSelections,
    ssrSelections,
  };

  if (process.env.DEBUG === "true") {
    console.log("📦 Booking Payload:", JSON.stringify(payload, null, 2));
  }

  return callTripJack("/oms/v1/air/book", payload);
};

// 🔹 Get Booking Details
const getBookingDetails = async (bookingRef) => {
  if (!bookingRef) throw new Error("bookingRef is required");
  return callTripJack("/oms/v1/booking-details", { bookingRef });
};

module.exports = {
  callTripJack,
  reviewFlight,
  getSeatMap,
  fareRule,
  bookFlight,
  getBookingDetails,
};
