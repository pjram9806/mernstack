const mssql = require("mssql");
require("dotenv").config();

// ✅ MSSQL Configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // required for Azure
    trustServerCertificate: true, // required for local/dev
  },
  connectionTimeout: 120000, // 2 minutes to connect
  requestTimeout: 300000,    // 5 minutes for heavy SPs
  pool: {
    max: 10, // maximum connections
    min: 0,  // minimum connections
    idleTimeoutMillis: 30000, // release idle connections
  },
};

// ✅ Create and reuse connection pool
const poolPromise = new mssql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("✅ Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed! Bad Config:", err);
    throw err;
  });

// ✅ Function to fetch an existing pool (auto-reconnect if dropped)
const getPool = async () => {
  const pool = await poolPromise;
  if (!pool.connected) await pool.connect();
  return pool;
};

module.exports = { mssql, getPool };
