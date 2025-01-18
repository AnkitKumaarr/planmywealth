import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "@/utils/db.config";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const token = await request.cookies?.get("auth_token");

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    try {
      const decoded = jwt.verify(
        token.value,
        process.env.NEXT_PUBLIC_JWT_SECRET
      );

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        console.log("decoded", decoded.email);
        return NextResponse.json(
          { error: "Verification token has expired" },
          { status: 400 }
        );
      }

      // Update user verification status
      // const result = await mysql.query(
      //   `UPDATE pmw_users
      //    SET is_verified = true, verification_token = NULL
      //    WHERE email = ? AND verification_token = ?`,
      //   [decoded.email, token]
      // );

      const [[user]] = await mysql.query(
        "SELECT full_name, role, user_referral_code FROM pmw_users WHERE email = ?",
        [decoded.email]
      );
      const { full_name, role, user_referral_code } = user;

      return NextResponse.json({
        status: 200,
        success: true,
        message: "Email verified successfully",
        data: {
          name: full_name,
          email: decoded.email,
          role,
          user_referral_code,
        },
      });
    } catch (jwtError) {
      return NextResponse.json(
        { error: "Invalid verification token", jwtError },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification error:");
    return NextResponse.json(
      { error: "Verification failed", error },
      { status: 500 }
    );
  }
}
