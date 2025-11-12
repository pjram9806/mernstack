const { mssql, getPool } = require("../../db/db");
const { reviewFlight } = require("../services/tripJack");

/**
 * POST /booking/create
 * Inserts TripJack booking details into DB via TR.USP_Insert_Booking_Full_V1
 */
const createPassengerBooking = async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;

    // Validate core fields
    if (!data.bookingId) {
      return res.status(400).json({ success: false, message: "Missing bookingId" });
    }
    if (!data.flight?.priceIds?.length) {
      return res.status(400).json({ success: false, message: "Missing flight priceIds" });
    }

    const priceId = data.flight.priceIds[0];

    // 🔹 Step 1: Review from TripJack (optional but useful)
    const review = await reviewFlight([priceId]);
    const totalFare = review?.totalPriceInfo?.totalFareDetail?.fC || {};

    // 🔹 Step 2: Map passengers
    const passengers = [];

    const mapPassengers = (list, type) => {
      if (!list) return;
      list.forEach((p, index) => {
        passengers.push({
          TitleID: mapTitle(p.title), // converts 'Mr' → 1 etc
          FirstName: p.firstName,
          LastName: p.lastName,
          GenderID: mapGender(p.gender), // converts 'Male' → 1 etc
          DOB: p.dateOfBirth,
          NationalityID: p.nationality ? mapNationality(p.nationality) : null,
          PassportNumber: p.passportNumber || null,
          PassengerType: type,
          SeatCode: getSeatForPassenger(data.selections?.seats, type, index),
          SSRItems: getSSRForPassenger(data.selections?.ssrItems, type, index),
          Email: p.email || null,
          Phone: p.phone || null,
        });
      });
    };

    mapPassengers(data.passengers?.adults, "ADULT");
    mapPassengers(data.passengers?.children, "CHILD");
    mapPassengers(data.passengers?.infants, "INFANT");

    // 🔹 Step 3: Prepare payload for DB
    const jsonPayload = JSON.stringify({
      Booking: {
        BookingID: data.bookingId,
        TripTypeID: mapTripType(data.tripType), // e.g. 1 oneway, 2 roundtrip
        Contact: data.contact,
        GSTDetails: data.gstDetails,
        GrandTotal: data.totals?.grandTotal || 0,
      },
      Flight: {
        PriceIds: data.flight.priceIds,
        Segments: data.flight.segments || [],
        BaseFare: totalFare?.BF || 0,
        Tax: totalFare?.TAF || 0,
      },
      SeatSelections: data.selections?.seats || {},
      SSRItems: data.selections?.ssrItems || {},
      Passengers: passengers,
    });

    // 🔹 Step 4: Call stored procedure
    const result = await pool
      .request()
      .input("JSON", mssql.NVarChar(mssql.MAX), jsonPayload)
      .execute("TR.USP_Insert_Booking_Full_V1");

    res.status(200).json({
      success: true,
      message: "Booking inserted successfully",
      recordset: result.recordset,
    });
  } catch (err) {
    console.error("❌ Error inserting booking:", err);
    res.status(500).json({
      success: false,
      message: "Error inserting booking.",
      error: err.message,
    });
  }
};

// 🔸 Utility Mappers
function mapTripType(type) {
  if (!type) return null;
  switch (type.toLowerCase()) {
    case "oneway":
      return 1;
    case "roundtrip":
      return 2;
    case "multicity":
      return 3;
    default:
      return null;
  }
}

function mapTitle(title) {
  switch ((title || "").toLowerCase()) {
    case "mr":
      return 1;
    case "mrs":
      return 2;
    case "master":
      return 3;
    default:
      return null;
  }
}

function mapGender(gender) {
  switch ((gender || "").toLowerCase()) {
    case "male":
      return 1;
    case "female":
      return 2;
    default:
      return null;
  }
}

// 🔸 Extract seat by matching passenger type + index
function getSeatForPassenger(seats, type, index) {
  if (!seats) return null;
  for (const segKey in seats) {
    for (const seatCode in seats[segKey]) {
      const seat = seats[segKey][seatCode];
      if (seat.passenger?.type === type && seat.passenger?.index === index) {
        return seatCode;
      }
    }
  }
  return null;
}

// 🔸 Extract SSR (meal/baggage) assigned to passenger
function getSSRForPassenger(ssrItems, type, index) {
  if (!ssrItems) return [];
  const items = [];
  for (const key in ssrItems) {
    const item = ssrItems[key];
    const assigned = item.assignedPassengers?.some(
      (p) => p.type === type && p.index === index
    );
    if (assigned) items.push(item);
  }
  return items;
}
/**
 * @route GET /api/flight/booking/:bookingId
 * @desc Retrieve full booking JSON via TR.USP_Get_Booking_Full_JSON
 */
const getPassengerBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    if (!bookingId)
      return res
        .status(400)
        .json({ success: false, message: "bookingId is required" });

    const pool = await getPool();
    const result = await pool
      .request()
      .input("BookingId", mssql.NVarChar, bookingId)
      .execute("TR.USP_Get_Booking_Full_JSON");

    const bookingData = result.recordset?.[0]?.BookingJSON;
    if (!bookingData)
      return res
        .status(404)
        .json({ success: false, message: "No booking found" });

    return res
      .status(200)
      .json({ success: true, data: JSON.parse(bookingData) });
  } catch (err) {
    console.error("❌ Fetch booking error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking details",
      error: err.message,
    });
  }
};

module.exports = {
  createPassengerBooking,
  getPassengerBooking,
};
