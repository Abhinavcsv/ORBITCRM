import dotenv from "dotenv";
dotenv.config();

import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@getbrevo/brevo";

const apiInstance = new TransactionalEmailsApi();

apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, html) => {
  try {
    const email = new SendSmtpEmail();

    email.sender = {
      name: process.env.SENDER_NAME || "OrbitCRM",
      email: process.env.SENDER_EMAIL,
    };

    email.to = [{ email: to }];
    email.subject = subject;
    email.htmlContent = html;

    const response = await apiInstance.sendTransacEmail(email);

    console.log("✅ Mail Sent:", response);
    return response;
  } catch (err) {
    console.error("❌ Mail Error:", err);
    throw err;
  }
};

export default sendEmail;