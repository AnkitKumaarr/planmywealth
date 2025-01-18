// pages/api/auth/callback.js

import { NextResponse } from "next/server";
import mysql from "@/utils/db.config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request) {
  // Extract the code from the request URL
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code is missing" });
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token exchange failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    const { access_token } = tokenData;

    // Fetch user info
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error(`User info fetch failed: ${userResponse.statusText}`);
    }

    const userInfo = await userResponse.json();
    const [rows] = await mysql.query(
      "SELECT * FROM pmw_users WHERE email = ?",
      [userInfo.email]
    );

    const verification_token = jwt.sign(
      { email: userInfo.email },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "7d" }
    );

    if (rows.length > 0) {
      // Update token and name
      const [result] = await mysql.query(
        "UPDATE pmw_users SET password = ?, verification_token = ?, role = ?, is_verified = ? WHERE email = ?",
        [access_token, verification_token, "user", 1, userInfo.email]
      );

      if (result.affectedRows > 0) {
        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("auth_token", verification_token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
        });
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        return NextResponse.json({
          status: 500,
          success: false,
          message: "Failed to update user data",
        });
      }
    }

    // Save the data
    const [result] = await mysql.query(
      "INSERT INTO pmw_users (full_name, email, password, verification_token, is_verified) VALUES (?, ?, ?, ?, ?)",
      [userInfo.name, userInfo.email, access_token, verification_token, 1]
    );

    if (result.affectedRows > 0) {
      const cookieStore = await cookies();
      cookieStore.set("auth_token", verification_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Failed to save user data",
      });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Authentication failed",
    });
  }
}
