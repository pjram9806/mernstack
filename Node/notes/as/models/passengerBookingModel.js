const { mssql, getPool } = require("../db/db");

// Deeply parse all nested JSON strings
const parseDeepJSON = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];

    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        obj[key] = parseDeepJSON(parsed);
      } catch {
        // leave as string if not JSON
      }
    } else if (typeof value === "object") {
      obj[key] = parseDeepJSON(value);
    }
  }
  return obj;
};

/**
 * Get booking by BookingID
 */
const getBookingById = async (bookingId) => {
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input("BookingID", mssql.Int, bookingId);
    request.requestTimeout = 120000;

    // Execute stored procedure
    const result = await request.execute("TR.USP_Get_Booking_Full_JSON");

    if (!result.recordset || result.recordset.length === 0) {
      return { success: true, data: null };
    }

    let data = result.recordset[0];

    // Detect and parse JSON column (FOR JSON PATH output)
    const jsonCol = Object.keys(data).find((k) =>
      k.startsWith("JSON_F52E2B61")
    );
    if (jsonCol && data[jsonCol]) {
      try {
        data = JSON.parse(data[jsonCol]);
      } catch (err) {
        console.warn("⚠️ JSON parse failed for SQL JSON column:", err.message);
      }
    }

    // Deep parse nested JSON
    data = parseDeepJSON(data);

    // Ensure flight.priceIds is an array
    if (data.flight?.priceIds && typeof data.flight.priceIds === "string") {
      try {
        data.flight.priceIds = JSON.parse(data.flight.priceIds);
      } catch {
        data.flight.priceIds = [];
      }
    }

    // ✅ Normalize and structure the booking data
    const structuredBooking = {
      bookingId: data.bookingId || data.BookingID || null,
      tripType: data.tripType || "",
      passengers: data.passengers || { adults: [], children: [], infants: [] },
      contact: data.contact || {},
      gstDetails: data.gstDetails || {},
      selections: data.selections || { seats: {}, ssrItems: {} },
      flight: data.flight || { priceIds: [], segments: [] },
      search: data.search || { routeInfos: [] },
      totals: data.totals || {},
      travelPurpose: data.travelPurpose || {},
      user: {
        id:
          data.user?.id ||
          data.user?.UserID ||
          data.UserID ||
          data.user_id ||
          data.userid ||
          data.User?.UserID ||
          null,
        email: data.user?.email || data.user?.Email || data.Email || "",
        name: data.user?.name || data.user?.Name || data.Name || "",
      },
    };

    return { success: true, data: structuredBooking };
  } catch (err) {
    console.error("❌ [getBookingById] Error:", err);
    return { success: false, error: err.message || String(err) };
  }
};

/**
 * Create booking → insert via SP → fetch full details
 */
const createBooking = async (bookingData) => {
  let transaction;
  try {
    const pool = await getPool();
    transaction = new mssql.Transaction(pool);
    await transaction.begin();

    const insertRequest = new mssql.Request(transaction);
    insertRequest.requestTimeout = 300000;

    const jsonPayload = JSON.stringify(bookingData);
    const insertResult = await insertRequest
      .input("JSON", mssql.NVarChar(mssql.MAX), jsonPayload)
      .execute("TR.USP_Insert_Booking_Full_V1");

    const bookingId =
      insertResult?.recordset?.[0]?.BookingID ??
      insertResult?.recordsets?.[0]?.[0]?.BookingID ??
      null;

    if (!bookingId) throw new Error("❌ No BookingID returned");

    await transaction.commit();

    const fetchResult = await getBookingById(bookingId);
    if (!fetchResult.success)
      throw new Error(fetchResult.error || "Failed to fetch booking");

    return { success: true, data: fetchResult.data, bookingId };
  } catch (err) {
    if (transaction) await transaction.rollback();
    console.error("❌ [createBooking] Error:", err);
    return { success: false, error: err.message || String(err) };
  }
};

module.exports = { createBooking, getBookingById };
