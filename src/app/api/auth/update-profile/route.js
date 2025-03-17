import { NextResponse } from "next/server";
import { authenticate } from "@/middleware/auth";
import mysql from "@/utils/db.config";

export async function POST(request) {
  try {
    // Authenticate the request
    const authResponse = await authenticate(request);

    if (typeof authResponse !== "string") {
      return authResponse; // Return the error response if authentication fails
    }

    const userEmail = authResponse;
    const { name, mobile, user_referral_code, profile_image } = await request.json();

    // Validate input
    if (!name && !mobile && !user_referral_code && !profile_image) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    // Check if referral code is unique if it's being updated
    if (user_referral_code) {
      const [existingCodes] = await mysql.query(
        "SELECT * FROM pmw_users WHERE user_referral_code = ? AND email != ?",
        [user_referral_code, userEmail]
      );

      if (existingCodes.length > 0) {
        return NextResponse.json(
          { error: "Referral code already in use" },
          { status: 400 }
        );
      }
      
      // Get the user's current referral code to update referred users
      const [[currentUser]] = await mysql.query(
        "SELECT user_referral_code FROM pmw_users WHERE email = ?",
        [userEmail]
      );
      
      if (currentUser && currentUser.user_referral_code) {
        // Update all users who were referred by this user
        await mysql.query(
          "UPDATE pmw_users SET referby_code = ? WHERE referby_code = ?",
          [user_referral_code, currentUser.user_referral_code]
        );
      }
    }

    // Build the update query dynamically based on provided fields
    let updateFields = [];
    let queryParams = [];

    if (name) {
      updateFields.push("full_name = ?");
      queryParams.push(name);
    }

    if (mobile) {
      updateFields.push("mobile = ?");
      queryParams.push(mobile);
    }

    if (user_referral_code) {
      updateFields.push("user_referral_code = ?");
      queryParams.push(user_referral_code);
    }

    if (profile_image) {
      updateFields.push("profile_image = ?");
      queryParams.push(profile_image);
    }

    // Add email as the last parameter for the WHERE clause
    queryParams.push(userEmail);

    // Execute the update query
    const [result] = await mysql.query(
      `UPDATE pmw_users SET ${updateFields.join(", ")} WHERE email = ?`,
      queryParams
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    // Fetch the updated user data
    const [[updatedUser]] = await mysql.query(
      "SELECT id, email, full_name as name, mobile, role, user_referral_code, profile_image FROM pmw_users WHERE email = ?",
      [userEmail]
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Check if referral code exists
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    
    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    const [existingCodes] = await mysql.query(
      "SELECT * FROM pmw_users WHERE user_referral_code = ?",
      [code]
    );

    return NextResponse.json({
      success: true,
      isAvailable: existingCodes.length === 0
    });
  } catch (error) {
    console.error("Referral code check error:", error);
    return NextResponse.json(
      { error: "Failed to check referral code" },
      { status: 500 }
    );
  }
} 