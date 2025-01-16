// src/middleware/auth.js

import { executeQuery } from "@/utils/db";
import { NextResponse } from "next/server";
import mysql from "@/utils/db.config";
import jwt from "jsonwebtoken";

export async function authenticate(request) {
  const token = await request.cookies?.get("auth_token");

  if (!token) {
    return NextResponse.json(
      { error: "Verification token is required" },
      { status: 400 }
    );
  }

  let decoded;
  try {
    decoded = jwt.verify(token.value, process.env.NEXT_PUBLIC_JWT_SECRET);

    if (decoded.exp * 1000 < Date.now()) {
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 400 }
      );
    }
    // check that user exists in database
    const user = await mysql.query(
      `SELECT * FROM pmw_users WHERE email = '${decoded.email}'`
    );
    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return NextResponse.json(
      { error: "JWT verification failed" },
      { status: 401 }
    );
  }

  // If authentication is successful, return null to continue
  return decoded.email;
}
