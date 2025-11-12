const masterModel = require("../models/masterDataModel");

// -------------------- Countries --------------------
const getCountries = async (req, res) => {
  try {
    const data = await masterModel.getCountries();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching countries:", err);
    res.status(500).json({ error: err.message });
  }
};

const insertUpdateCountry = async (req, res) => {
  try {
    const data = await masterModel.insertUpdateCountry(req.body);
    res.status(200).json({ msg: "Country Insert/Update successful", result: data });
  } catch (err) {
    console.error("Error inserting/updating country:", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- States --------------------
const getStates = async (req, res) => {
  try {
    const data = await masterModel.getStates();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const insertUpdateState = async (req, res) => {
  try {
    const data = await masterModel.insertUpdateState(req.body);
    res.status(200).json({ msg: "State Insert/Update successful", result: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- Cities --------------------
const getCities = async (req, res) => {
  try {
    const data = await masterModel.getCities();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const insertUpdateCity = async (req, res) => {
  try {
    const data = await masterModel.insertUpdateCity(req.body);
    res.status(200).json({ msg: "City Insert/Update successful", result: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- Districts --------------------
const getDistricts = async (req, res) => {
  try {
    const data = await masterModel.getDistricts();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const insertUpdateDistrict = async (req, res) => {
  try {
    const data = await masterModel.insertUpdateDistrict(req.body);
    res.status(200).json({ msg: "District Insert/Update successful", result: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- Areas --------------------
const getAreas = async (req, res) => {
  try {
    const data = await masterModel.getAreas();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const insertUpdateArea = async (req, res) => {
  try {
    const data = await masterModel.insertUpdateArea(req.body);
    res.status(200).json({ msg: "Area Insert/Update successful", result: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- Genders --------------------
const getGenders = async (req, res) => {
  try {
    // Call the model
    const recordset = await masterModel.getGenders();

    // Some SPs return JSON string inside a column
    let genders = [];
    if (recordset && recordset.length > 0 && recordset[0].Result) {
      genders = JSON.parse(recordset[0].Result);
    }

    res.status(200).json(genders);
  } catch (err) {
    console.error("Error fetching genders:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// -------------------- Nationalities --------------------
const getNationalities = async (req, res) => {
  try {
    const result = await masterModel.getNationalities();

    if (!result.success) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch nationalities" });
    }

    let rawData = result.data;
    let parsedNationalities = [];

    // 🧠 MSSQL FOR JSON PATH returns JSON string under this weird key
    if (
      rawData &&
      rawData.length > 0 &&
      rawData[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
    ) {
      const jsonString =
        rawData[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"];
      try {
        parsedNationalities = JSON.parse(jsonString);
      } catch (parseErr) {
        console.error("❌ Failed to parse JSON from DB:", parseErr);
      }
    }

    // ✅ Return clean dropdown array
    return res.status(200).json({
      success: true,
      data: parsedNationalities,
    });
  } catch (err) {
    console.error("❌ [getNationalitiesController] Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const insertUpdateNationality = async (req, res) => {
  try {
    const payload = req.body;

    if (!Array.isArray(payload) || payload.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Payload must be a non-empty array of nationalities",
      });
    }

    const result = await masterModel.insertOrUpdateNationalities(payload);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to insert/update nationalities",
        error: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Nationality insert/update successful",
      result: result.data,
    });
  } catch (err) {
    console.error("❌ [insertOrUpdateNationalitiesController] Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = {
  getCountries,
  insertUpdateCountry,
  getStates,
  insertUpdateState,
  getCities,
  insertUpdateCity,
  getDistricts,
  insertUpdateDistrict,
  getAreas,
  insertUpdateArea,
  getGenders,
  getNationalities,
  insertUpdateNationality,
};