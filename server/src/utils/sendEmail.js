import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, html) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: process.env.SENDER_NAME,
          email: process.env.SENDER_EMAIL,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    console.log("✅ Mail Sent:", data);
    return data;
  } catch (err) {
    console.error("❌ Mail Error:", err);
    throw err;
  }
};

export default sendEmail;