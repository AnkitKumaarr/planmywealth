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
    term_insurance_amount,
    health_insurance_amount,
    additionalCoverNeeded,
    education_expenses,
    wedding_expenses,
    education_inflation,
    wedding_inflation,
    emergency_fund_amount,
    healthInsuranceNeed,
    additionalHealthCoverNeeded,
    knowsLivingExpenses,
    monthly_expenses,
    total_monthly_expenses,
    monthly_expenses_inflation,
    retirement_monthly_expenses_inflation
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
      educationExpenses: formatToWords(data?.education_expenses || 0),
      weddingExpenses: formatToWords(data?.wedding_expenses || 0),
      educationInflation: formatToWords(data?.education_inflation),
      weddingInflation: formatToWords(data?.wedding_inflation),
      termInsuranceAmount: formatToWords(data?.term_insurance_amount || 0),
      healthInsuranceAmount: formatToWords(data?.health_insurance_amount || 0),
      emergencyFundAmount: formatToWords(data?.emergency_fund_amount || 0),
      healthInsuranceNeed: formatToWords(data?.healthInsuranceNeed || 0),
      additionalHealthCoverNeeded: formatToWords(
        data?.additionalHealthCoverNeeded || 0
      ),
      knowsLivingExpenses: data?.knowsLivingExpenses,
      monthlyExpenses: formatToWords(data?.monthly_expenses || 0),
      totalMonthlyExpenses: formatToWords(data?.total_monthly_expenses || 0),
      monthlyExpensesInflation: formatToWords(
        data?.monthly_expenses_inflation || 0
      ),
      retirementMonthlyExpensesInflation: formatToWords(
        data?.retirement_monthly_expenses_inflation || 0
      ),
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
