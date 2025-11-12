import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // ⚡️ frontend URL (not backend!)
        return_url: "http://132.156.145.6:5000/payment-success",
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // If no error → Stripe will handle redirect automatically
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "50px auto" }}>
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          borderRadius: "8px",
          background: "#6772e5",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </form>
  );
}

export default CheckoutForm;
