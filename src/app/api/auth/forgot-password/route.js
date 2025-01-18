import { NextResponse } from "next/server";
import mysql, { checkDatabaseConnection } from "@/utils/db.config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { initializeDatabase } from "@/utils/schema";
import { sendResetPasswordEmail } from "@/utils/emailService";

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Ensure database connection is established
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Initialize database and create table if it doesn't exist
    await initializeDatabase();

    // Check if user already exists
    const [rows] = await mysql.query(
      "SELECT * FROM pmw_users WHERE email = ?",
      [email]
    );

    if (rows.length < 1) {
      return NextResponse.json(
        { error: "Email not registered" },
        { status: 400 }
      );
    }
    const user = rows[0];

    const verificationToken = jwt.sign(
      { email, role: user.role },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Get a connection from the pool
    const connection = await mysql.getConnection();

    try {
      // Start a transaction
      await connection.beginTransaction();

      // Insert new user
      const result = await connection.query(
        `UPDATE pmw_users SET verification_token = ? WHERE email = ?`,
        [verificationToken, email]
      );

      // Send verification email
      const emailResponse = await sendResetPasswordEmail(
        email,
        verificationToken
      );

      if (!emailResponse.success) {
        throw new Error("Failed to send reset link to your email");
      }

      // Commit the transaction if email is sent successfully
      await connection.commit();

      return NextResponse.json({
        success: true,
        status: 200,
        message: "We have sent you a reset link to your email.",
      });
    } catch (emailError) {
      // Rollback the transaction if email sending fails
      await connection.rollback();
      console.error("Email sending error:", emailError);

      return NextResponse.json(
        { error: "Failed to send reset link to your email" },
        { status: 500 }
      );
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
