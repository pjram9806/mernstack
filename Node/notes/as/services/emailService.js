const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async ({ to, subject, text, html, attachments = [] }) => {
  try {
    if (!to || !/\S+@\S+\.\S+/.test(to)) {
      throw new Error(`Invalid or missing recipient email: ${to}`);
    }

    console.log(`📧 Preparing to send email to: "${to}"`);

    const port = parseInt(process.env.SMTP_PORT, 10) || 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, 
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PWD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_ID}>`,
      to: to.trim(),
      subject,
      text,
      html,
      attachments, 
    });


    
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
    throw err;
  }
};

module.exports = { sendEmail };
