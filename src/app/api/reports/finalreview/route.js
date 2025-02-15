import { NextResponse } from "next/server";
import { authenticate } from "@/middleware/auth";
import mysql from "@/utils/db.config";

export async function POST(request) {
  const { uuid } = await request.json();
  const authResponse = await authenticate(request);
  if (typeof authResponse !== "string") {
    return authResponse;
  }

  // Utility function to format numbers
  const formatToWords = (num) => {
    if (!num || isNaN(num)) return "";
    const value = Number(num);
    if (value < 1000) return `₹ ${value}`;
    if (value < 100000) return `₹ ${(value / 1000).toFixed(1)} thousand`;
    if (value < 10000000) return `₹ ${(value / 100000).toFixed(1)} lakh`;
    return `₹ ${(value / 10000000).toFixed(1)} crore`;
  };
  const nomineeReactionOptions = [
    {
      id: "confident",
      label: "Will Be Able To Manage It Confidently - Without A Sweat",
    },
    {
      id: "reliable",
      label: "Will Have Reliable People To Depend On To Manage The Money",
    },
    {
      id: "nervous",
      label: "Is Likely To Get Nervous / Panic Without Support",
    },
    {
      id: "tricked",
      label: "Might Get Tricked Into Buying Unnecessary Financial Products",
    },
  ];

  const userEmail = authResponse;
  try {
    // write the query to get the data from the database
    const query = `SELECT uuid, retirement_age, nomineeReaction, 
    savings_amount, 
    total_investments,
    additionalCoverNeeded,
    education_inflation,
    wedding_inflation
    FROM true_reports WHERE userEmail = ? AND uuid = ?`;
    const [result] = await mysql.query(query, [userEmail, uuid]);
    const data = result[0];
    const finalSavingAmount =
      parseFloat(data?.savings_amount) + parseFloat(data?.total_investments);

    const finalReviewData = {
      age: data?.retirement_age,
      nomineeReaction: nomineeReactionOptions.find(
        (option) => option.id === data?.nomineeReaction
      )?.label,
      finalSavingAmount: formatToWords(finalSavingAmount),
      additionalCoverNeeded: formatToWords(data?.additionalCoverNeeded),
      educationInflation: formatToWords(data?.education_inflation),
      weddingInflation: formatToWords(data?.wedding_inflation),
    };
    return NextResponse.json({
      success: true,
      status: 200,
      result: finalReviewData,
    });
  } catch (error) {
    console.error("Error generating report:", error);
  }
}
