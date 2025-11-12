const {mssql,getPool} = require("../db/db");

const getAirlinesFromDB = async (search) => {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("SearchTerm", mssql.NVarChar(100), search || null)
    .execute("MA.USP_GETAIRLINES_JSON");

  return result.recordset;
};

module.exports = { getAirlinesFromDB };