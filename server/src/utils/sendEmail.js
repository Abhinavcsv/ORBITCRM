import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      // IMPORTANT: Use 'onboarding@resend.dev' for free tier testing.
      // Once you add a custom domain, change it to: "OrbitCRM <your-email@yourdomain.com>"
      from: "OrbitCRM <onboarding@resend.dev>",
      to: [to], // Resend expects an array or a comma-separated string
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      throw error;
    }

    console.log("✅ Email Sent:", data.id);
    return data;
  } catch (err) {
    console.error("❌ Email System Error:", err);
    throw err;
  }
};

export default sendEmail;
