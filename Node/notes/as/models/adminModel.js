const {getPool,mssql} = require("../db/db");

// Login verification using email, password, OTP
const verifyLogin = async ({ email, password, otp }) => {
  const pool = await getPool();

  const payload = JSON.stringify({ EMAIL: email, PASSWORD: password, OTP: otp });

  const result = await pool
    .request()
    .input("JSON", mssql.NVarChar, payload)
    .execute("SE.USP_VERIFY_OTP_LOGIN");

  const rawData = result.recordset?.[0];
  if (!rawData) return null;

  const firstKey = Object.keys(rawData)[0];
  return JSON.parse(rawData[firstKey]);
};

module.exports = { verifyLogin };