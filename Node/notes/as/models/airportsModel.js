const  {mssql,getPool} = require("../db/db");

const getAirportsFromDB = async (searchTerm) => {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("SearchTerm", mssql.NVarChar(100), searchTerm || null)
    .execute("MA.USP_GetAirports_JSON");

  return result.recordset;
};

const insertAirportToDB = async (airportPayload) => {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("AirportJSON", mssql.NVarChar(mssql.MAX), JSON.stringify(airportPayload))
    .execute("MA.USP_InsertAirport_JSON");

  const spResponse = result.recordset[0];
  const jsonString = spResponse && Object.values(spResponse)[0];
  return jsonString ? JSON.parse(jsonString) : {};
};

module.exports = { getAirportsFromDB, insertAirportToDB };