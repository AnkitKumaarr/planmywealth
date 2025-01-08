import { NextResponse } from "next/server";
import mysql, { checkDatabaseConnection } from "@/utils/db.config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { initializeDatabase } from "@/utils/schema";
import { sendVerificationEmail } from "@/utils/emailService";

export async function POST(request) {
  try {
    const { email, fullName, password } = await request.json();

    // Validate input
    if (!email || !fullName || !password) {
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

    if (rows.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = jwt.sign(
      { email },
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
        `INSERT INTO pmw_users (email, full_name, password, verification_token)
         VALUES (?, ?, ?, ?)`,
        [email, fullName, hashedPassword, verificationToken]
      );

      // Send verification email
      const emailResponse = await sendVerificationEmail(
        email,
        verificationToken
      );

      if (!emailResponse.success) {
        throw new Error("Failed to send verification email");
      }

      // Commit the transaction if email is sent successfully
      await connection.commit();

      return NextResponse.json({
        success: true,
        status: 200,
        message:
          "Registration successful. Please check your email for verification.",
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
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
