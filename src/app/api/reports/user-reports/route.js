import { authenticate } from "@/middleware/auth";
import { NextResponse } from "next/server";
import mysql from "@/utils/db.config";

// Utility function to format numbers
const formatToWords = (num) => {
  if (!num || isNaN(num)) return "";
  const value = Number(num);
  if (value < 1000) return `₹ ${value}`;
  if (value < 100000) return `₹ ${(value / 1000).toFixed(1)} thousand`;
  if (value < 10000000) return `₹ ${(value / 100000).toFixed(1)} lakh`;
  return `₹ ${(value / 10000000).toFixed(1)} crore`;
};

export async function GET(req) {
  const authResponse = await authenticate(req);
  if (typeof authResponse !== "string") {
    return authResponse;
  }

  const userEmail = authResponse;
  try {
    const query = `SELECT uuid, first_name, last_name,retirement_age, additionalCoverNeeded FROM true_reports WHERE userEmail = ?`;
    const [reports] = await mysql.query(query, [userEmail]);

    if (reports.length === 0) {
      NextResponse.json({ success: true, status: 200, data: [] });
    }

    const filteredReports = reports.map((report) => {
      return {
        uuid: report?.uuid,
        name: report.first_name + " " + report.last_name,
        retirementAge: report.retirement_age,
        additionalCoverNeeded: formatToWords(report.additionalCoverNeeded),
      };
    });

    return NextResponse.json({
      success: true,
      status: 200,
      data: filteredReports,
    });
  } catch (error) {
    return NextResponse.json({ success: false, status: 500, error: error });
  }
}
