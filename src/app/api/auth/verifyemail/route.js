import { NextResponse } from "next/server";
import mysql from "@/utils/db.config";
import jwt from "jsonwebtoken";
import { checkDatabaseConnection } from "@/utils/db.config";

export async function POST(request) {
  let connection;
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    // Initialize or get pool safely
    try {
      if (!mysql.pool) {
        await mysql.createPool();
      }
    } catch (error) {
      console.error("Pool initialization error:", error);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
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

    try {
      // Verify token and check expiration
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

      if (decoded.exp * 1000 < Date.now()) {
        return NextResponse.json(
          { error: "Verification token has expired" },
          { status: 400 }
        );
      }

      // Get a connection from the pool
      connection = await mysql.getConnection();

      const [[user]] = await connection.query(
        "SELECT * FROM pmw_users WHERE email = ? AND verification_token = ?",
        [decoded.email, token]
      );

      if (!user || user.verification_token !== token) {
        return NextResponse.json(
          { error: "Invalid verification token" },
          { status: 400 }
        );
      }

      const verificationToken = jwt.sign(
        { email: user.email, role: user.role },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const [result] = await connection.query(
        `UPDATE pmw_users 
         SET is_verified = true,
         verification_token = ?
         WHERE email = ?`,
        [verificationToken, decoded.email]
      );

      if (result.affectedRows === 0) {
        return NextResponse.json(
          { error: "Invalid or expired verification token" },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (jwtError) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
