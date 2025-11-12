const {mssql,getPool} = require('../db/db');

const checkUserExists = async (email) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("EMAIL", mssql.NVarChar(255), email)
    .query("SELECT 1 AS ExistsFlag FROM SE.Users WHERE Email = @EMAIL");
  return result.recordset.length > 0;
};

const insertOtp = async (payload) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("JSON", mssql.NVarChar(mssql.MAX), JSON.stringify(payload))
    .execute("SE.USP_INSERT_OTP_LOG_JSON");

  return result.recordset?.[0] || null;
};

const verifyOtp = async (otp) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("JSON", mssql.NVarChar(mssql.MAX), JSON.stringify({ OTP: otp }))
    .execute("SE.USP_VERIFY_OTP_LOGIN");

  const response = result.recordset?.[0];
  if (!response) return null;

  return response["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
    ? JSON.parse(response["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
    : response;
};


module.exports = { checkUserExists, insertOtp, verifyOtp };