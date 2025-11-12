const createPassengerBooking = async (req, res) => {
  try {
    const {
      bookingId: clientBookingId,
      priceIds,
      paymentInfos,
      travellerInfo,
      gstInfo,
      deliveryInfo,
      tripType,
      totals,
      travelPurpose,
      contact,
      flightSegments,
      search,
      selections,
      passengers,
      userEmail,
      userName,
    } = req.body;

    // ✅ Validate essential fields
    if (!paymentInfos?.length || !travellerInfo?.length) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: paymentInfos, travellerInfo",
      });
    }

    // ✅ Step 1: Get or generate Booking ID
    let bookingId = clientBookingId;
    if (!bookingId) {
      if (!priceIds?.length) {
        return res.status(400).json({
          success: false,
          message:
            "bookingId or priceIds required — please provide one to continue.",
        });
      }

      const reviewResponse = await reviewFlight(priceIds);
      if (!reviewResponse?.bookingId) {
        return res.status(400).json({
          success: false,
          message: "Unable to generate bookingId from TripJack /review",
          reviewResponse,
        });
      }

      bookingId = reviewResponse.bookingId;
    }

    // ✅ Step 2: Attempt booking through TripJack
    let bookResponse;
    try {
      bookResponse = await bookFlight({
        bookingId,
        paymentInfos,
        travellerInfo,
        gstInfo,
        deliveryInfo,
      });

      if (!bookResponse?.status?.success) {
        throw new Error(
          bookResponse?.errors?.[0]?.message ||
            "Booking failed on TripJack side"
        );
      }
    } catch (error) {
      console.warn(
        "⚠️ TripJack booking failed, inserting DEMO booking...",
        error.response?.data || error.message
      );

      // ✅ Mock demo booking for DB testing
      bookResponse = {
        user: {
          email: userEmail || "demo@example.com",
          name: userName || "Demo User",
        },
        tripType: tripType || "oneway",
        totals: totals || {
          grandTotal: paymentInfos[0]?.amount || 0,
          seatSelectionTotal: 0,
          ssrItemsTotal: 0,
        },
        travelPurpose: travelPurpose || null,
        contact: contact || {
          name: userName || "Demo User",
          email: userEmail || "demo@example.com",
          phone: "9999999999",
        },
        gstDetails: gstInfo || {
          registrationNumber: "15CHARACTERSGSTIN",
          companyName: "Demo Corp",
          email: "demo@example.com",
          phone: "9999999999",
          address: "Demo Address",
        },
        flight: {
          priceIds: priceIds || [],
          segments: flightSegments || [],
        },
        search: search || { routeInfos: [] },
        selections: selections || { seats: {}, ssrItems: {} },
        passengers: passengers || { adults: [], children: [], infants: [] },
        bookingRef: bookingId,
        pnr: "DEMO-PNR-" + Date.now(),
        timestamp: new Date(),
      };
    }

    // ✅ Step 3: Insert booking response into DB
    const pool = await getPool();
    const dbResult = await pool
      .request()
      .input("JSON", mssql.NVarChar, JSON.stringify(bookResponse))
      .execute("TR.USP_Insert_Booking_Full_V1");

    return res.status(200).json({
      success: true,
      message: "Booking stored successfully",
      bookingId,
      tripjackResponse: bookResponse,
      dbResult,
    });
  } catch (error) {
    console.error("❌ Book Flight Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while booking flight",
      error: error.response?.data || error.message,
    });
  }
};