const {insertAirportToDB,getAirportsFromDB} = require("../models/airportsModel");

const getAirports = async (req, res) => {
  try {
    let { searchTerm } = req.query;
    searchTerm = searchTerm && searchTerm.trim() ? searchTerm.trim() : null;

    const recordset = await getAirportsFromDB(searchTerm);
    let airportsJson = [];

    if (recordset.length > 0) {
      const rawJson = Object.values(recordset[0])[0];
      if (rawJson) {
        try {
          airportsJson = JSON.parse(rawJson);
        } catch (err) {
          console.error("Invalid JSON from DB:", err);
        }
      }
    }

    res.status(200).json(airportsJson);
  } catch (err) {
    console.error("Error fetching airports:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const insertAirport = async (req, res) => {
  try {
    const {
      AirportCode,
      AirportName,
      CityID,
      StateID,
      CountryID,
      OrgID,
      GrpID,
      LocID,
      IsActive,
      CreatedBy,
    } = req.body;

    if (!AirportCode || !AirportName || !CityID || !CountryID || !CreatedBy) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const responseJson = await insertAirportToDB({
      AirportCode,
      AirportName,
      CityID,
      StateID,
      CountryID,
      OrgID,
      GrpID,
      LocID,
      IsActive,
      CreatedBy,
    });

    res.status(200).json(responseJson);
  } catch (err) {
    console.error("Error inserting airport:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = { getAirports, insertAirport };