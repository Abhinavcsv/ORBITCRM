import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "74.125.140.108", // smtp.gmail.com IPv4
  port: 587,
  secure: false,
  requireTLS: true,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection on server startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Error:", error);
  } else {
    console.log("✅ SMTP Server is Ready");
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    console.log("📧 Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"OrbitCRM Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email Send Error:", error);
    throw error;
  }
};

export default sendEmail;