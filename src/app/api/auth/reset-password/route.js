import { sendPasswordResetSuccessEmail } from "@/utils/emailService";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mysql from "@/utils/db.config";

export async function POST(req) {
  const { token, password } = await req.json();

  if (!token) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ message: "Invalid password" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
  const userEmail = decoded.email;

  if (!userEmail) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  const verificationToken = jwt.sign(
    { userEmail },
    process.env.NEXT_PUBLIC_JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  // campare both tokens

  const result = await mysql.query(
    `SELECT * FROM pmw_users WHERE email = ? AND verification_token = ?`,
    [userEmail, token]
  );

  if (result.length === 0) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  if (token !== result[0].verification_token) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  // Get a connection from the pool
  const connection = await mysql.getConnection();

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Update password
    const result = await connection.query(
      `UPDATE pmw_users SET password = ?, verification_token = ? WHERE email = ?`,
      [hashedPassword, verificationToken, userEmail]
    );

    // Send verification email
    const emailResponse = await sendPasswordResetSuccessEmail(userEmail);

    if (!emailResponse.success) {
      throw new Error("Failed to send verification email");
    }

    // Commit the transaction if email is sent successfully
    await connection.commit();

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Password reset successful.",
    });
  } catch (emailError) {
    // Rollback the transaction if email sending fails
    await connection.rollback();
    console.error("Email sending error:", emailError);

    return NextResponse.json(
      { error: "Registration failed due to email sending error" },
      { status: 500 }
    );
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
}
