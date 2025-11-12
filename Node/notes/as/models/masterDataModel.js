const { getPool, mssql } = require("../db/db");

// Generic SP executor with optional custom parameter name
const executeSP = async (spName, payload = {}, paramName = null) => {
  const pool = await getPool();
  const request = pool.request();

  if (paramName && payload !== undefined) {
    request.input(paramName, mssql.NVarChar(mssql.MAX), JSON.stringify(payload));
  }

  const result = await request.execute(spName);
  return result.recordset;
};

// -------------------- Countries --------------------
const getCountries = async () => {
  return await executeSP("MA.USP_GET_COUNTRIES_JSON", {}, null);
};

const insertUpdateCountry = async (payload) => {
  return await executeSP("MA.USP_INSERTUPDATE_COUNTRY_JSON", payload, "JSON");
};

// -------------------- States --------------------
const getStates = async () => {
  return await executeSP("MA.USP_GET_STATES_JSON", {}, null);
};

const insertUpdateState = async (payload) => {
  return await executeSP("MA.USP_INSERTUPDATE_COUNTRY_JSON", payload, "JSON");
};

// -------------------- Cities --------------------
const getCities = async () => {
  // Cities SP requires @JSON even if empty
  return await executeSP("MA.USP_GET_CITIES_JSON", {}, "JSON");
};

const insertUpdateCity = async (payload) => {
  return await executeSP("MA.USP_INSERTUPDATE_CITIES_JSON", payload, "JSON");
};

// -------------------- Districts --------------------
const getDistricts = async () => {
  return await executeSP("MA.USP_GET_DISTRICTS_JSON", {}, null);
};

const insertUpdateDistrict = async (payload) => {
  return await executeSP("MA.USP_INSERTUPDATE_DISTRICTS_JSON", payload, "JSON");
};

// -------------------- Areas --------------------
const getAreas = async () => {
  return await executeSP("MA.USP_GET_AREAS_JSON", {}, null);
};

const insertUpdateArea = async (payload) => {
  return await executeSP("MA.USP_INSERTUPDATE_AREAS_JSON", payload, "JSON");
};

// -------------------- Genders --------------------
const getGenders = async () => {
  // Genders SP requires @JsonInput parameter
  return await executeSP("MA.USP_GET_GENDERS_JSON", {}, "JsonInput");
};

// -------------------- Nationalities --------------------
/**
 * 🔹 Get all nationalities (for dropdown)
 */
const getNationalities = async () => {
  try {
    const pool = await getPool();
    const result = await pool.request().execute("[MA].[USP_Get_Nationalities]");

    return {
      success: true,
      data: result.recordset || [],
    };
  } catch (err) {
    console.error("❌ [getNationalities] DB Error:", err);
    return { success: false, error: err.message };
  }
};

/**
 * 🔹 Insert or Update nationalities
 * Executes: [MA].[usp_SaveNationalities_JSON]
 * @param {Array} nationalityData - Array of nationality objects
 */
const insertOrUpdateNationalities = async (nationalityData) => {
  try {
    const pool = await getPool();
    const request = pool.request();

    // Convert payload array → JSON string
    const jsonPayload = JSON.stringify(nationalityData);

    // Pass JSON to stored procedure
    request.input("JsonData", mssql.NVarChar(mssql.MAX), jsonPayload);

    const result = await request.execute("[MA].[usp_SaveNationalities_JSON]");

    return {
      success: true,
      data: result.recordset || [],
    };
  } catch (err) {
    console.error("❌ [insertOrUpdateNationalities] DB Error:", err);
    return { success: false, error: err.message };
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
  insertOrUpdateNationalities
};
