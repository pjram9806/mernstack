// model/paymentModel.js
const { sql, dbConfig } = require("../config/db");

// ✅ Save Order (to Orders table)
const saveOrder = async (orderData) => {
  const { user_id, order_id, amount, currency, status, source } = orderData;

  const pool = await sql.connect(dbConfig);

  await pool.request()
    .input("order_id", sql.VarChar(100), order_id)
    .input("user_id", sql.Int, user_id)
    .input("amount", sql.Decimal(10, 2), amount)
    .input("currency", sql.VarChar(10), currency || "INR")
    .input("status", sql.VarChar(20), status)
    .input("source", sql.VarChar(50), source || null)
    .query(`
      INSERT INTO Orders (order_id, user_id, amount, currency, status, source, created_at)
      VALUES (@order_id, @user_id, @amount, @currency, @status, @source, GETDATE())
    `);
};

// ✅ Save Payment (to Payments table, AFTER payment is done)
const savePayment = async (paymentData) => {
  const {
    user_id,
    order_id,
    payment_id,
    method,
    amount,
    currency,
    status,
    qr_code_id,
    bank,
    wallet,
    vpa
  } = paymentData;

  const pool = await sql.connect(dbConfig);

  await pool.request()
    .input("payment_id", sql.VarChar(100), payment_id)
    .input("order_id", sql.VarChar(100), order_id)
    .input("qr_code_id", sql.VarChar(100), qr_code_id || null)
    .input("user_id", sql.Int, user_id)
    .input("amount", sql.Decimal(10, 2), amount)
    .input("currency", sql.VarChar(10), currency || "INR")
    .input("status", sql.VarChar(20), status)
    .input("method", sql.VarChar(50), method || null)
    .input("bank", sql.VarChar(50), bank || null)
    .input("wallet", sql.VarChar(50), wallet || null)
    .input("vpa", sql.VarChar(100), vpa || null)
    .query(`
      INSERT INTO Payments 
      (payment_id, order_id, qr_code_id, user_id, amount, currency, status, method, bank, wallet, vpa, created_at)
      VALUES (@payment_id, @order_id, @qr_code_id, @user_id, @amount, @currency, @status, @method, @bank, @wallet, @vpa, GETDATE())
    `);
};

// ✅ Update Payment Status
const updatePaymentStatus = async (order_id, status, payment_id = null) => {
  const pool = await sql.connect(dbConfig);

  await pool.request()
    .input("order_id", sql.VarChar(100), order_id)
    .input("status", sql.VarChar(20), status)
    .input("payment_id", sql.VarChar(100), payment_id)
    .query(`
      UPDATE Orders
      SET status = @status
      WHERE order_id = @order_id;

      UPDATE Payments
      SET status = @status, payment_id = @payment_id
      WHERE order_id = @order_id;
    `);
};

const getPaymentByOrderId = async (order_id) => {
  const pool = await sql.connect(dbConfig);
  const result = await pool.request()
    .input("order_id", sql.VarChar(100), order_id)
    .query("SELECT * FROM Orders WHERE order_id = @order_id");

  return result.recordset[0];
};

module.exports = { saveOrder, savePayment, getPaymentByOrderId, updatePaymentStatus };
