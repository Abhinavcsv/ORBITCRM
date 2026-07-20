import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, html) => {
  try {
    console.log("========== BREVO DEBUG ==========");
    console.log("To:", to);
    console.log("Sender:", process.env.SENDER_EMAIL);
    console.log("API Key Exists:", !!process.env.BREVO_API_KEY);

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
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();

    console.log("Brevo Status:", response.status);
    console.log("Brevo Response:", data);

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default sendEmail;