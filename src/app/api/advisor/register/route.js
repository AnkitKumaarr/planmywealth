import { NextResponse } from "next/server";
import mysql, { checkDatabaseConnection } from "@/utils/db.config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { initializeDatabase } from "@/utils/schema";
import { sendVerificationEmail } from "@/utils/emailService";

export async function POST(request) {
  let connection = null;
  
  try {
    const { advisors } = await request.json();

    // Validate input
    if (!advisors || !Array.isArray(advisors) || advisors.length === 0) {
      return NextResponse.json(
        { error: "No advisors provided" },
        { status: 400 }
      );
    }

    // Ensure database connection is established
    try {
      // Check if pool is closed or doesn't exist and reinitialize if necessary
      if (!mysql.pool || mysql.pool._closed) {
        await mysql.createPool();
      }
      
      const isConnected = await checkDatabaseConnection();
      if (!isConnected) {
        throw new Error("Database connection failed");
      }
      
      // Get a connection from the pool
      connection = await mysql.getConnection();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { error: "Unable to connect to database", details: dbError.message },
        { status: 500 }
      );
    }
    
    // Start transaction
    try {
      await connection.beginTransaction();
    } catch (transactionError) {
      console.error("Transaction error:", transactionError);
      if (connection) connection.release();
      return NextResponse.json(
        { error: "Failed to start database transaction", details: transactionError.message },
        { status: 500 }
      );
    }

    // Initialize database schema
    try {
      await initializeDatabase();
    } catch (schemaError) {
      console.error("Schema initialization error:", schemaError);
      if (connection) {
        try { await connection.rollback(); } catch (e) { console.error("Rollback error:", e); }
        connection.release();
      }
      return NextResponse.json(
        { error: "Failed to initialize database schema", details: schemaError.message },
        { status: 500 }
      );
    }

    const results = [];
    const errors = [];

    // Process each advisor
    for (const advisor of advisors) {
      try {
        const { name, full_name, email, password, verified, role } = advisor;
        const advisorName = name || full_name || "";
        
        // Validate required fields
        if (!email || !advisorName || !password) {
          errors.push({
            email: email || "unknown",
            error: "Missing required fields",
          });
          continue;
        }

        // Check if connection is still valid
        if (!connection || connection.connection._closing || connection.connection._closed) {
          throw new Error("Database connection was closed");
        }

        // Check if user already exists
        let rows;
        try {
          [rows] = await connection.query(
            "SELECT * FROM pmw_users WHERE email = ?",
            [email]
          );
        } catch (queryError) {
          throw new Error(`Database query failed: ${queryError.message}`);
        }

        if (rows.length > 0) {
          errors.push({
            email,
            error: "Email already registered",
          });
          continue;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a unique user referral code
        let userReferralCode;
        let isUnique = false;

        while (!isUnique) {
          userReferralCode =
            Math.random().toString(36).substring(2, 5) +
            Math.random().toString(36).substring(2, 5);

          try {
            const [checkRows] = await connection.query(
              "SELECT * FROM pmw_users WHERE user_referral_code = ?",
              [userReferralCode]
            );
            
            if (checkRows.length === 0) {
              isUnique = true;
            }
          } catch (refCodeError) {
            throw new Error(`Failed to check referral code: ${refCodeError.message}`);
          }
        }

        // Determine the role
        const currentUserRole = role || "advisor";

        // Generate verification token (if not already verified)
        const verificationToken = !verified
          ? jwt.sign(
              { email, role: currentUserRole },
              process.env.NEXT_PUBLIC_JWT_SECRET,
              {
                expiresIn: "24h",
              }
            )
          : "";

        // Insert new user
        try {
          await connection.query(
            `INSERT INTO pmw_users (email, full_name, password, role, verification_token, user_referral_code, is_verified)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              email,
              advisorName,
              hashedPassword,
              currentUserRole,
              verificationToken,
              userReferralCode,
              verified ? 1 : 0,
            ]
          );
        } catch (insertError) {
          throw new Error(`Failed to insert user: ${insertError.message}`);
        }

        // Send verification email if not verified
        if (!verified && verificationToken) {
          try {
            await sendVerificationEmail(email, verificationToken);
          } catch (emailError) {
            console.error(`Failed to send verification email to ${email}:`, emailError);
            // Continue anyway, the user is registered but might not receive the email
          }
        }

        results.push({
          email,
          status: "success",
        });
      } catch (advisorError) {
        console.error(`Error registering advisor ${advisor.email || 'unknown'}:`, advisorError);
        errors.push({
          email: advisor.email || "unknown",
          error: advisorError.message || "Registration failed",
        });
      }
    }

    // Commit transaction if we have any successful registrations
    if (connection && !connection.connection._closing && !connection.connection._closed) {
      try {
        await connection.commit();
      } catch (commitError) {
        console.error("Commit error:", commitError);
        try { await connection.rollback(); } catch (e) { console.error("Rollback error:", e); }
        
        return NextResponse.json({
          success: false,
          error: "Failed to commit changes to database",
          results,
          errors,
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      errors,
      message: `Successfully registered ${results.length} advisors. Failed: ${errors.length}.`,
    });
  } catch (error) {
    console.error("Bulk registration error:", error);
    
    // Try to rollback if connection is still valid
    if (connection && !connection.connection._closing && !connection.connection._closed) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Rollback error:", rollbackError);
      }
    }
    
    return NextResponse.json(
      { error: "Bulk registration failed", details: error.message },
      { status: 500 }
    );
  } finally {
    // Release connection if it's still valid
    if (connection && !connection.connection._closing && !connection.connection._closed) {
      try {
        connection.release();
      } catch (releaseError) {
        console.error("Connection release error:", releaseError);
      }
    }
  }
} 