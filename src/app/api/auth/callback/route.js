// pages/api/auth/callback.js

import { NextResponse } from "next/server";
import mysql from "@/utils/db.config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request) {
  // Extract the code from the request URL
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  let referId = null;
  let redirect_path = null;

  if (state) {
    try {
      const decodedState = decodeURIComponent(state);
      if (decodedState) {
        const stateData = JSON.parse(decodedState);
        referId = stateData.referId || "";
        redirect_path = stateData.redirect_path || "/";
        currentStep = stateData.currentStep || 17;
      }
    } catch (error) {
      console.error("Error parsing state:", error);
    }
  }

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

    let userReferralCode;
    let isUnique = false;

    // Generate a unique user referral code
    while (!isUnique) {
      userReferralCode =
        Math.random().toString(36).substring(2, 5) +
        Math.random().toString(36).substring(2, 5);

      const [rows] = await mysql.query(
        "SELECT * FROM pmw_users WHERE user_referral_code = ?",
        [userReferralCode]
      );

      if (rows.length === 0) {
        isUnique = true;
      }
    }

    // find user referId
    const [users] = await mysql.query(
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

    const verification_token = jwt.sign(
      { email: userInfo.email, role: currentUserRole },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "7d" }
    );

    if (rows.length > 0) {
      // Update token and name
      const [result] = await mysql.query(
        "UPDATE pmw_users SET password = ?, verification_token = ?, is_verified = ? WHERE email = ?",
        [access_token, verification_token, 1, userInfo.email]
      );

      if (result.affectedRows > 0) {
        const cookieStore = await cookies();
        await cookieStore.set("auth_token", verification_token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
        });

        const baseUrl =
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const finalRedirectUrl = redirect_path?.startsWith("http")
          ? redirect_path
          : `${baseUrl}${redirect_path || "/"}`;

        return NextResponse.redirect(finalRedirectUrl);
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
      "INSERT INTO pmw_users (full_name, email, password, role, user_referral_code,referby_code, verification_token, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userInfo.name,
        userInfo.email,
        access_token,
        currentUserRole,
        userReferralCode,
        referId,
        verification_token,
        1,
      ]
    );

    if (result.affectedRows > 0) {
      const cookieStore = await cookies();
      await cookieStore.set("auth_token", verification_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const finalRedirectUrl = redirect_path?.startsWith("http")
        ? redirect_path
        : `${baseUrl}${redirect_path || "/"}`;

      return NextResponse.redirect(finalRedirectUrl);
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
