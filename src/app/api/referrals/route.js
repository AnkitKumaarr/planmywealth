import { authenticate } from "@/middleware/auth";
import { NextResponse } from "next/server";
import mysql from "@/utils/db.config";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authResponse = await authenticate(req);
    if (typeof authResponse !== "string") {
      return authResponse;
    }

    const token = await req.cookies?.get("auth_token");
    const decoded = jwt.verify(token.value, process.env.NEXT_PUBLIC_JWT_SECRET);

    const userEmail = authResponse;
    const query = `SELECT * FROM pmw_users WHERE email = ?`;
    const [users] = await mysql.query(query, [userEmail]);

    if (decoded.role === "manager" || users[0].role === "manager") {
      const [totalUsers] = await mysql.query(
        `SELECT * FROM pmw_users WHERE referby_code = ?`,
        [users[0].user_referral_code]
      );

      // filter out all the emails from it
      const emails = [];
      totalUsers.forEach((item) => {
        emails.push(item.email);
      });
      const [reports] = await mysql.query(`SELECT * FROM true_reports`);
      const filteredReports = reports.filter((item) =>
        emails.includes(item.email)
      );
      return NextResponse.json({ status: 200, data: filteredReports });
    }
    if (decoded.role === "admin" || users[0].role === "admin") {
      const [reports] = await mysql.query(`SELECT * FROM true_reports`);
      const [totalUsers] = await mysql.query(`SELECT * FROM pmw_users`);
      // filter out all the users and their details

      const reportsData = [];

      reports.forEach((item) => {
        const currentUserItem = totalUsers.filter(
          (user) => user.email === item.userEmail
        );
        const user = totalUsers.find(
          (user) => user.user_referral_code === currentUserItem[0].referby_code
        );
        reportsData.push({
          ...item,
          referby_email: user?.email || "N/A",
          referby_name: user?.full_name || "N/A",
        });
      });
      return NextResponse.json({ status: 200, data: reportsData });
    }
    return NextResponse.json({
      status: 400,
      message: "You are not authorized to access this page",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching referrals" },
      { status: 500 }
    );
  }
}
