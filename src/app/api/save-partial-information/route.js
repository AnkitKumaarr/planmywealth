import { NextResponse } from "next/server";
import mysql from "@/utils/db.config";
import { authenticate } from "@/middleware/auth";

export async function POST(req) {
  try {
    const { formData } = await req.json();
    const authResponse = await authenticate(req);

    let userId = null;
    let referralByEmail = null;

    if (typeof authResponse === "string") {
      userId = authResponse;

      // Use parameterized queries to prevent SQL injection
      const [userRows] = await mysql.query(
        "SELECT referby_code FROM pmw_users WHERE email = ?",
        [userId]
      );

      console.log(userRows);
      if (userRows && userRows.length > 0) {
        const currentUserReferByCode = userRows[0].referby_code;

        // Only query for referral if referby_code exists
        if (currentUserReferByCode) {
          const [referralRows] = await mysql.query(
            "SELECT email FROM pmw_users WHERE user_referral_code = ?",
            [currentUserReferByCode]
          );
          if (referralRows && referralRows.length > 0) {
            referralByEmail = referralRows[0].email;
          }
        }
      }
    }

    // Check if table exists
    const tableCheckQuery = `
      SELECT COUNT(*) as count FROM information_schema.tables 
      WHERE table_schema = DATABASE() AND table_name = 'partial_form_pmw'
    `;
    const [tableExists] = await mysql.query(tableCheckQuery);

    // Create table if it doesn't exist
    if (tableExists[0].count === 0) {
      const createTableQuery = `
        CREATE TABLE partial_form_pmw (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id VARCHAR(255),
          uuid VARCHAR(255) NOT NULL,
          name VARCHAR(255),
          phone_number VARCHAR(20),
          pincode VARCHAR(10),
          gender VARCHAR(20),
          education VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      await mysql.query(createTableQuery);
    }

    const query = `
      INSERT INTO partial_form_pmw (user_id, uuid, name, phone_number, pincode, gender, education, referral_email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await mysql.query(query, [
      userId || "Not Logged In",
      formData.uuid,
      formData.firstName + " " + formData.lastName,
      formData.phoneNumber,
      formData.pincode,
      formData.gender,
      formData.education,
      referralByEmail,
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving partial information:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
