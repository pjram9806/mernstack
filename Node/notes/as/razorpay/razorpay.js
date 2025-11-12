require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();

// Use JSON for normal routes
app.use(express.json());

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);


// 1️⃣ Create Checkout Order
app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, userId } = req.body;

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: currency || "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save to DB (Orders table)
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2️⃣ Verify Checkout Payment
app.post("/verify-payment", async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (generatedSignature === signature) {
      // Update Orders & Payments in DB
      res.json({ status: "success", order_id, payment_id });
    } else {
      res.status(400).json({ status: "failure" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3️⃣ Create Dynamic QR
app.post("/create-qr", async (req, res) => {
  try {
    const { amount, currency, userId } = req.body;

    const qr = await razorpay.qrCode.create({
      type: "upi_qr",
      name: `User_${userId}`,
      usage: "single_use",
      fixed_amount: true,
      payment_amount: amount * 100,
      description: "QR Payment",
    });

    // Save to DB (Orders table)
    res.json(qr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4️⃣ Webhook (raw body required for signature verification)
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(req.body.toString("utf8"));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("Webhook Verified ✅");

    const event = req.body.event;
    const payment = req.body.payload.payment.entity;

    if (event === "payment.captured") {
      if (payment.qr_code_id) {
        console.log("✅ QR Payment Captured:", payment);
        // update DB for QR
      } else if (payment.order_id) {
        console.log("✅ Checkout Payment Captured:", payment);
        // update DB for Checkout
      }
    }
    res.json({ status: "ok" });
  } else {
    console.log("❌ Invalid Webhook Signature");
    res.status(400).send("Invalid signature");
  }
});