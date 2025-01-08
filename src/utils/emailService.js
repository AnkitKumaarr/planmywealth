import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_SMTP_HOST,
  port: process.env.NEXT_PUBLIC_SMTP_PORT,
  secure: true,
  auth: {
    user: "kannojiya2ankit@gmail.com",
    pass: "mxqjnzxwiuudthef",
  },
});

export async function sendVerificationEmail(email, token) {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

  const mailOptions = {
    from: "kannojiya2ankit@gmail.com",
    to: email,
    subject: "Verify Your Email - Plan My Wealth",
    html: `
      <h1>Welcome to Plan My Wealth!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>This link will expire in 24 hours.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
    return { success: true, info };
  } catch (error) {
    console.error("Email sending error:", error);
    return { error: error.message };
  }
}
