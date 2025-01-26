import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_SMTP_HOST,
  port: process.env.NEXT_PUBLIC_SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(email, token) {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SMTP_USER,
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
    return { success: true, info };
  } catch (error) {
    console.error("Email sending error:", error);
    return { error: error.message };
  }
}

export async function sendResetPasswordEmail(email, token) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SMTP_USER,
    to: email,
    subject: "Reset Your Password - Plan My Wealth",
    html: `
      <h1>Reset Your Password</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error("Email sending error:", error);
    return { error: error.message };
  }
}

export async function sendPasswordResetSuccessEmail(email) {
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SMTP_USER,
    to: email,
    subject: "Password Reset Success - Plan My Wealth",
    html: `
      <h1>Password Reset Success</h1>
      <p>Your password has been reset successfully.</p>
    `,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error("Email sending error:", error);
    return { error: error.message };
  }
}
