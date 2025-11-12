const adminModel = require("../models/adminModel");

const adminLogin = async (req, res) => {
  try {
    const { email, password, otp } = req.query;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const loginResult = await adminModel.verifyLogin({ email, password, otp });

    if (!loginResult) {
      return res.status(401).json({ error: "Invalid credentials or no response from database" });
    }

    res.json(loginResult);
  } catch (err) {
    console.error("Error in adminLogin:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { adminLogin };
