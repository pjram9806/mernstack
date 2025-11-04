const crypto = require("crypto");
const Razorpay = require("razorpay");
const path = require("path");
const axios = require("axios");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { saveOrder, savePayment, getPaymentByOrderId, updatePaymentStatus } = require("../model/paymentModel");


// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Import Model Functions

// ✅ Create Order
const createOrder = async (req, res) => {
  try {
    const { amount, user_id } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    await saveOrder({
      order_id: order.id,
      user_id,
      amount,
      currency: "INR",
      status: "created",
      source: "checkout"
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

// ✅ Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const orderDetails = await getPaymentByOrderId(razorpay_order_id);
    if (!orderDetails) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // ✅ Save Payment (only after successful verification)
    await savePayment({
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      user_id: orderDetails.user_id,
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      status: "paid",
      method: "razorpay"
    });

    await updatePaymentStatus(razorpay_order_id, "paid", razorpay_payment_id);

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ✅ Create UPI QR Code Payment
const createUPIQR = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ success: false, error: "Amount is required" });
    }

    const payload = {
      type: "upi_qr",
      name: "Test Merchant",
      usage: "single_use",
      fixed_amount: true,
      payment_amount: Math.round(amount * 100),
      description: `QR Payment for INR ${amount}`,
    };

    const response = await axios.post(
      "https://api.razorpay.com/v1/payments/qr_codes",
      payload,
      {
        auth: {
          username: process.env.RAZORPAY_KEY_ID,
          password: process.env.RAZORPAY_KEY_SECRET,
        },
      }
    );

    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error("❌ Error creating UPI QR:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: err.response?.data || "Failed to create UPI QR",
    });
  }
};

// ✅ Check Payment Status
const checkPaymentStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    if (!order_id) {
      return res.status(400).json({ success: false, error: "order_id is required" });
    }

    const order = await razorpay.orders.fetch(order_id);
    res.json({ success: true, status: order.status, data: order });
  } catch (err) {
    console.error("❌ Error checking payment status:", err);
    res.status(500).json({ success: false, error: "Failed to fetch order status" });
  }
};
  

module.exports = { createOrder, verifyPayment,createUPIQR, checkPaymentStatus };
