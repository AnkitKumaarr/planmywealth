import { NextResponse } from "next/server";
import mysql, { checkDatabaseConnection } from "@/utils/db.config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { initializeDatabase } from "@/utils/schema";
import { sendVerificationEmail } from "@/utils/emailService";

export async function POST(request) {
  let connection;
  try {
    const { email, fullName, password, referId } = await request.json();

    // Validate input
    if (!email || !fullName || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if pool is closed or doesn't exist and reinitialize if necessary
    if (!mysql.pool || mysql.pool._closed) {
      await mysql.createPool();
    }

    // Ensure database connection is established
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Get a connection from the pool
    connection = await mysql.getConnection();

    // Check if user already exists (use connection instead of pool)
    const [rows] = await connection.query(
      "SELECT * FROM pmw_users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Initialize database and create table if it doesn't exist
    await initializeDatabase();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let userReferralCode;
    let isUnique = false;

    // Generate a unique user referral code
    while (!isUnique) {
      userReferralCode =
        Math.random().toString(36).substring(2, 5) +
        Math.random().toString(36).substring(2, 5);

      const [rows] = await connection.query(
        "SELECT * FROM pmw_users WHERE user_referral_code = ?",
        [userReferralCode]
      );

      if (rows.length === 0) {
        isUnique = true;
      }
    }

    // find user referId
    const [users] = await connection.query(
      "SELECT * FROM pmw_users WHERE user_referral_code = ?",
      [referId]
    );
    let currentUserRole = "user";
    if (users.length === 0) {
      currentUserRole = "user";
    } else {
      const user = users[0];
      currentUserRole =
        user.role === "manager"
          ? "user"
          : user.role === "admin"
          ? "manager"
          : "user";
    }

    const verificationToken = jwt.sign(
      { email, role: currentUserRole },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Insert new user
    const result = await connection.query(
      `INSERT INTO pmw_users (email, full_name, password,role, verification_token,user_referral_code, referby_code)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        fullName,
        hashedPassword,
        currentUserRole,
        verificationToken,
        userReferralCode,
        referId || "",
      ]
    );

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      verificationToken
    );

    if (!emailResponse.success) {
      throw new Error("Failed to send verification email");
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (connection) {
      await connection.rollback();
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
