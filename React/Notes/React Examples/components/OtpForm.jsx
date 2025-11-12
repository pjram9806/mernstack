import React, { useState } from 'react';
import axios from 'axios';

const SendOtpForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      setMessage('Please enter an email.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:6500/api/send', { email });
      setMessage(res.data.message || 'OTP sent successfully');
      alert('OTP sent successfully to ' + email);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h3>Send OTP to Email</h3>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px', border: '1px solid #ccc' }}
      />
      <button
        disabled={!email || loading}
        onClick={sendOtp}
        style={{
          padding: '10px',
          width: '100%',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Sending...' : 'Send OTP'}
      </button>
      {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
    </div>
  );
};

export default SendOtpForm;
