import React, { useState } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);
  const [upiQR, setUpiQR] = useState(null);

  // 🧠 Load Razorpay Script Dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🟢 1️⃣ Create Order + Launch Razorpay Checkout
  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://132.156.145.6:6500/api/payments/create-order", {
        amount: 500, // in rupees
        user_id: 1,
      });

      console.log("✅ Order Created:", res.data);
      const order = res.data.order;
      console.log("✅ Order Created:", res.data.order);


      if (!order || !order.id) throw new Error("Order ID not found");

      const isScriptLoaded = await loadRazorpay();
      if (!isScriptLoaded) {
        alert("Failed to load Razorpay SDK. Check your network.");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_RCGEkaDiFxNyHH", // 🟢 use your key_id
        amount: order.amount,
        currency: order.currency,
        name: "Payment Demo",
        description: "Test Razorpay Payment",
        order_id: order.id,
        handler: async (response) => {
          console.log("💰 Payment Success:", response);

          await axios.post("http://132.156.145.6:6500/api/payments/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: order.amount,
            currency: order.currency,
            user_id: 1,
          });

          alert("🎉 Payment Successful!");
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Payment Error:", err);
      alert("Payment failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 2️⃣ Create UPI QR Code
  const handleCreateUPIQR = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://132.156.145.6:6500/api/payments/create-upi-qr", {
        user_id: 1,
        amount: 500,
      });

      console.log("📱 UPI QR Created:", res.data);
      if (res.data.success) {
        setUpiQR(res.data.data.image_qr);
        setLastOrderId(res.data.data.order_id);
        alert("Scan the QR to complete payment!");
      } else {
        alert("Failed to create UPI QR");
      }
    } catch (err) {
      console.error("❌ UPI QR Error:", err);
      alert("Failed to create UPI QR");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 3️⃣ Check Payment Status
  const handleCheckStatus = async () => {
    if (!lastOrderId) {
      alert("No order found. Please create a UPI QR or payment first.");
      return;
    }

    try {
      const res = await axios.get(
        `http://132.156.145.6:6500/api/payments/check-status/${lastOrderId}`
      );

      console.log("🔎 Payment Status:", res.data);
      if (res.data.success) {
        alert(`Payment Status: ${res.data.data.status.toUpperCase()}`);
      } else {
        alert("❌ Could not fetch payment status");
      }
    } catch (err) {
      console.error("Status Check Error:", err);
      alert("Failed to check payment status");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>💳 Razorpay Integration Demo</h2>

      {/* Razorpay Checkout */}
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay ₹500 (Razorpay Checkout)"}
      </button>

      <br /><br />

      {/* UPI QR Payment */}
      <button onClick={handleCreateUPIQR} disabled={loading}>
        {loading ? "Generating QR..." : "Create UPI QR Payment"}
      </button>

      {upiQR && (
        <div style={{ marginTop: "20px" }}>
          <h4>📸 Scan this QR to Pay</h4>
          <img
            src={upiQR}
            alt="UPI QR"
            style={{ width: "250px", height: "250px", border: "1px solid #ccc", borderRadius: "8px" }}
          />
        </div>
      )}

      <br /><br />

      {/* Check Payment Status */}
      <button onClick={handleCheckStatus} disabled={loading || !lastOrderId}>
        Check Last Payment Status
      </button>
    </div>
  );
};

export default PaymentPage;
