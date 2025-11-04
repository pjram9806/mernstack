const { createOrder, verifyPayment, createUPIQR, checkPaymentStatus } = require('../controller/paymentController');
const express = require('express');

const router = express.Router();

// 🔹 Card/Netbanking/Wallet Orders
router.post("/create-order", createOrder);

// 🔹 Verify Signature (after frontend payment success callback)
router.post("/verify", verifyPayment);

// 🔹 Polling API: Check payment status
router.get("/status/:order_id", checkPaymentStatus);

// 🔹 UPI QR order (scanner style)
router.post("/create-qr", createUPIQR);

module.exports = router;
