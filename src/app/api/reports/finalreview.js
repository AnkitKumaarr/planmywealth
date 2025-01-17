import { NextResponse } from "next/server";
import { authenticate } from "@/middleware/auth";
import mysql from "@/utils/db.config";

export async function GET() {

  const authResponse = await authenticate(request);
  if (typeof authResponse !== "string") {
    return authResponse;
  }

  const userEmail = authResponse;
  try {
    // write the query to get the data from the database
    const query = `SELECT retirement_age, nomineeReaction, 
    savings_amount, 
    total_investments,
    additionalCoverNeeded
    FROM true_reports WHERE userEmail = ?`;
    console.log("Ankit1");
    const result = await mysql.query(query, userEmail);
    console.log("result", result);
    const data = result[0];
    console.log("Ankit", data);

    return NextResponse.json({ success: true, status: 200, data: data });
  } catch (error) {
    console.log("Ankit2", error);
    console.error("Error generating report:", error);
  }
}
