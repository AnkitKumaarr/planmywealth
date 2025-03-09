import { NextResponse } from "next/server";
import mysql from "@/utils/db.config";
import { authenticate } from "@/middleware/auth";

export async function GET(req) {
  try {
    // Authenticate the request
    const authResponse = await authenticate(req);
    
    if (typeof authResponse === "object" && authResponse.error) {
      return NextResponse.json(
        { success: false, error: "Authentication failed" },
        { status: 401 }
      );
    }

    // Get user information to check role
    const [userResult] = await mysql.query(
      `SELECT * FROM pmw_users WHERE email = ?`,
      [authResponse]
    );

    if (!userResult || userResult.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const user = userResult[0];

    // Check if user is admin
    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Check if table exists
    const tableCheckQuery = `
      SELECT COUNT(*) as count FROM information_schema.tables 
      WHERE table_schema = DATABASE() AND table_name = 'partial_form_pmw'
    `;
    const [tableExists] = await mysql.query(tableCheckQuery);

    if (tableExists[0].count === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Fetch partial information data
    const query = `
      SELECT * FROM partial_form_pmw
      ORDER BY created_at DESC
    `;
    
    const [results] = await mysql.query(query);

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error("Error fetching partial information:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 