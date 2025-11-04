const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql");
const Razorpay = require("razorpay");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ SQL Config
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: { encrypt: false, trustServerCertificate: true }
};

// ✅ Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------- ROUTES ------------

// Create Order
app.post("/create-order", async (req, res) => {
  try {
    const { userId, amount, currency = "INR" } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: `rcpt_${Date.now()}`,
    });

    // Insert into Orders
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("order_id", sql.VarChar, order.id)
      .input("user_id", sql.Int, userId)
      .input("amount", sql.Int, amount)
      .input("currency", sql.VarChar, currency)
      .input("source", sql.VarChar, "checkout")
      .input("status", sql.VarChar, order.status)
      .query(`
        INSERT INTO orders (order_id, user_id, amount, currency, source, status, created_at)
        VALUES (@order_id, @user_id, @amount, @currency, @source, @status, GETDATE())
      `);

    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Verify Payment (Checkout Flow)
app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

    const crypto = require("crypto");
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const pool = await sql.connect(dbConfig);

    if (expectedSignature === razorpay_signature) {
      await pool.request()
        .input("payment_id", sql.VarChar, razorpay_payment_id)
        .input("order_id", sql.VarChar, razorpay_order_id)
        .input("user_id", sql.Int, userId)
        .input("status", sql.VarChar, "success")
        .query(`
          INSERT INTO Payments (payment_id, order_id, user_id, status, created_at)
          VALUES (@payment_id, @order_id, @user_id, @status, GETDATE())
        `);

      // update order status
      await pool.request()
        .input("order_id", sql.VarChar, razorpay_order_id)
        .query("UPDATE orders SET status='paid' WHERE order_id=@order_id");

      return res.json({ status: "success" });
    } else {
      return res.json({ status: "failed" });
    }
  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// Create QR Code Payment
app.post("/create-qr", async (req, res) => {
  try {
    const { userId, amount, currency = "INR" } = req.body;

    const qr = await razorpay.qrCodes.create({
      type: "upi_qr",
      name: "Test QR",
      usage: "single_use",
      fixed_amount: true,
      payment_amount: amount * 100,
      description: "QR Payment",
    });

    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("order_id", sql.VarChar, qr.id)
      .input("user_id", sql.Int, userId)
      .input("amount", sql.Int, amount)
      .input("currency", sql.VarChar, currency)
      .input("source", sql.VarChar, "qr")
      .input("status", sql.VarChar, qr.status)
      .query(`
        INSERT INTO orders (order_id, user_id, amount, currency, source, status, created_at)
        VALUES (@order_id, @user_id, @amount, @currency, @source, @status, GETDATE())
      `);

    res.json(qr);
  } catch (err) {
    console.error("QR Error:", err);
    res.status(500).json({ error: "Failed to create QR" });
  }
});


// Get all payments
app.get("/payments", async (req, res) => {
  const pool = await sql.connect(dbConfig);
  const result = await pool.request().query("SELECT * FROM Payments");
  res.json(result.recordset);
});

// Get all orders
app.get("/orders", async (req, res) => {
  const pool = await sql.connect(dbConfig);
  const result = await pool.request().query("SELECT * FROM orders");
  res.json(result.recordset);
});

// Get all users
app.get("/users", async (req, res) => {
  const pool = await sql.connect(dbConfig);
  const result = await pool.request().query("SELECT * FROM RZPUsers");
  res.json(result.recordset);
});


// ---------- START SERVER ------------
const PORT = process.env.PORT || 6500;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
