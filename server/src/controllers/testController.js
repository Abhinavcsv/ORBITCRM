import sendEmail from "../utils/sendEmail.js";

export const sendTestEmail = async (req, res) => {
  try {
    await sendEmail(
      process.env.EMAIL_USER,
      "OrbitCRM Test Email",
      `
      <h2>🚀 OrbitCRM</h2>

      <p>Hello Abhinav,</p>

      <p>Your email service is working successfully.</p>

      <p><strong>Congratulations 🎉</strong></p>

      <hr>

      <p>OrbitCRM Team</p>
      `
    );

    res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};