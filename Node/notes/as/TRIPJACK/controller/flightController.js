const { callTripJack } = require("../services/tripJack");

const formatDate = (dateStr) => {
  if (!dateStr) return null;

  let isoDate;

  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    // Convert DD-MM-YYYY -> YYYY-MM-DD
    const [day, month, year] = dateStr.split("-");
    isoDate = `${year}-${month}-${day}`;
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    isoDate = dateStr;
  } else if (!isNaN(Date.parse(dateStr))) {
    isoDate = new Date(dateStr).toISOString().split("T")[0];
  } else {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  // ✅ Extra validation: ensure date actually exists (e.g., reject 2025-09-31)
  const d = new Date(isoDate);
  const [y, m, day] = isoDate.split("-");
  if (
    d.getFullYear() !== parseInt(y) ||
    d.getMonth() + 1 !== parseInt(m) ||
    d.getDate() !== parseInt(day)
  ) {
    throw new Error(`Invalid calendar date: ${dateStr}`);
  }

  return isoDate;
};

const searchFlights = async (req, res) => {
  try {
    console.log("📩 Incoming frontend payload:", JSON.stringify(req.body, null, 2));

    const { searchQuery } = req.body;

    if (!searchQuery) {
      return res.status(400).json({ error: "searchQuery is required" });
    }

    if (!searchQuery.routeInfos || !Array.isArray(searchQuery.routeInfos) || searchQuery.routeInfos.length === 0) {
      return res.status(400).json({ error: "routeInfos must be a non-empty array" });
    }

    // ✅ Validate dates
    let prevDate = null;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // compare only dates (ignore time)

    searchQuery.routeInfos.forEach((route, idx) => {
      if (!route.fromCityOrAirport?.code || !route.toCityOrAirport?.code || !route.travelDate) {
        throw new Error(`Route ${idx + 1} is missing from/to/date`);
      }

      const currentDate = new Date(formatDate(route.travelDate));
      if (isNaN(currentDate.getTime())) {
        throw new Error(`Route ${idx + 1} has invalid travelDate: ${route.travelDate}`);
      }

      // 🚫 Past date validation
      if (currentDate < today) {
        throw new Error(
          `Route ${idx + 1} travelDate (${route.travelDate}) cannot be in the past`
        );
      }

      // 🚫 Ascending order validation
      if (prevDate && currentDate < prevDate) {
        throw new Error(
          `Route ${idx + 1} travelDate (${route.travelDate}) must be on or after previous route date`
        );
      }

      prevDate = currentDate;
    });

    const payload = { searchQuery };
    console.log("🔍 Final Payload to TripJack:", JSON.stringify(payload, null, 2));

    const result = await callTripJack("/fms/v1/air-search-all", payload);
    res.json(result);

  } catch (error) {
    console.error("❌ Flight Search Error:", error.message);
    // return proper HTTP code if it's a validation issue
    if (error.message.includes("Route")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchFlights };
