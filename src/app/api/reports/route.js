import { NextResponse } from "next/server";
import { authenticate } from "@/middleware/auth";
import mysql from "@/utils/db.config";
import { executeQuery } from "@/utils/db";

export async function POST(request) {
  // Call the authentication middleware
  const authResponse = await authenticate(request);

  // Check if authentication failed
  if (typeof authResponse !== "string") {
    return authResponse; // Return the response if authentication fails
  }

  // If authentication is successful, authResponse contains the email
  const userEmail = authResponse;

  try {
    const { formData } = await request.json();

    const {
      firstName,
      lastName,
      dateOfBirth,
      age,
      pincode,
      gender,
      education,
      disease,
      smoking,
      alcohol,
      incomeSources,
      incomeStability,
      retirementAge,
      hasDependents,
      dependents,
      nomineeReaction,
      knowsLivingExpenses,
      monthlyExpenses,
      hasLoans,
      loanAmount,
      hasSavings,
      savingsAmount,
      knowsInvestments,
      totalInvestments,
      hasLifeCover,
      numberOfKids,
      educationExpenses,
      weddingExpenses,
      hasEmergencyFund,
      emergencyFundAmount,
      emergencyFundMonths,
      totalMonthlyExpenses,
      lifeCoverAmount,
    } = formData;

    // 1. Calculate Current Age
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(dateOfBirth).getFullYear();
    const currentAge = currentYear - birthYear;

    // 2. Calculate Annual Income
    const annualIncome = incomeSources.reduce(
      (total, source) => total + parseFloat(source.amount || 0),
      0
    );

    // 3. Calculate Years to Retirement
    const yearsToRetirement = retirementAge - currentAge;

    // 4. Calculate Total Savings
    const totalSavings =
      parseFloat(savingsAmount || 0) + parseFloat(totalInvestments || 0);

    const totalIncome = annualIncome * yearsToRetirement;

    // Liabilities = (Loan Amount) + (Education Expenses) + (Wedding Expenses) + (Living Expenses Shortfall) + (Emergency Fund Shortfall)
    const liabilities =
      parseFloat(loanAmount || 0) +
      parseFloat(educationExpenses || 0) +
      parseFloat(weddingExpenses || 0) +
      parseFloat(monthlyExpenses || 0) +
      parseFloat(emergencyFundAmount || 0);

    // 5. Calculate Life Insurance Need

    const lifeInsuranceNeed = totalIncome + liabilities - totalSavings;

    const additionalCoverNeeded = Math.max(lifeInsuranceNeed, 0);

    // Convert dependents array to a count
    const dependentsCount = Array.isArray(dependents) ? dependents.length : 0;

    // Check if the table exists, if not, create it
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS true_reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userEmail VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        date_of_birth DATE,
        age INT,
        pincode VARCHAR(255),
        gender VARCHAR(50),
        education VARCHAR(255),
        disease BOOLEAN,
        smoking BOOLEAN,
        alcohol BOOLEAN,
        total_income DECIMAL(15, 2),
        income_stability VARCHAR(255),
        retirement_age INT,
        hasDependents BOOLEAN,
        dependents INT, 
        nomineeReaction VARCHAR(255),
        knowsLivingExpenses BOOLEAN,
        monthly_expenses DECIMAL(15, 2),
        hasLoans BOOLEAN,
        loan_amount DECIMAL(15, 2),
        hasSavings BOOLEAN,
        savings_amount DECIMAL(15, 2),
        knowsInvestments BOOLEAN,
        total_investments DECIMAL(15, 2),
        hasLifeCover BOOLEAN,
        life_cover_amount DECIMAL(15, 2),
        number_of_kids INT,
        education_expenses DECIMAL(15, 2),
        wedding_expenses DECIMAL(15, 2),
        hasEmergencyFund BOOLEAN,
        emergency_fund_amount DECIMAL(15, 2),
        emergency_fund_months INT,
        calculated_coverage DECIMAL(15, 2),
        inflation_adjusted_expenses DECIMAL(15, 2),
        recommended_coverage DECIMAL(15, 2),
        total_monthly_expenses DECIMAL(15, 2),
        lifeInsuranceNeed DECIMAL(15, 2),
        additionalCoverNeeded DECIMAL(15, 2)
      );
    `;

    await mysql.query(createTableQuery);
    // Insert into database
    const query = `
      INSERT INTO true_reports (
        userEmail, first_name, last_name, date_of_birth, age, pincode, gender, education, disease,
        smoking, alcohol, total_income, income_stability, retirement_age,
        hasDependents, dependents, nomineeReaction, knowsLivingExpenses, monthly_expenses,
        hasLoans, loan_amount, hasSavings, savings_amount, knowsInvestments, total_investments,
        hasLifeCover, life_cover_amount, number_of_kids, education_expenses, wedding_expenses,
        hasEmergencyFund, emergency_fund_amount, emergency_fund_months, total_monthly_expenses,
        lifeInsuranceNeed, additionalCoverNeeded
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;

    // Log the incoming data for debugging
    console.log("Received formData:", formData);

    // Ensure all values are defined, using default values if necessary
    const values = [
      userEmail || "",
      firstName || "",
      lastName || "",
      dateOfBirth || "",
      currentAge || 0,
      pincode || "",
      gender || "",
      education || "",
      disease === "yes",
      smoking === "yes",
      alcohol === "yes",
      totalIncome || 0,
      incomeStability || "",
      retirementAge || 0,
      hasDependents !== undefined ? hasDependents : false,
      dependentsCount, // Use the count of dependents
      nomineeReaction || "",
      knowsLivingExpenses !== undefined ? knowsLivingExpenses : false,
      monthlyExpenses || 0,
      hasLoans !== undefined ? hasLoans : false,
      loanAmount || 0,
      hasSavings !== undefined ? hasSavings : false,
      savingsAmount || 0,
      knowsInvestments !== undefined ? knowsInvestments : false,
      totalInvestments || 0,
      hasLifeCover !== undefined ? hasLifeCover : false,
      lifeCoverAmount || 0,
      numberOfKids || 0,
      educationExpenses || 0,
      weddingExpenses || 0,
      hasEmergencyFund !== undefined ? hasEmergencyFund : false,
      emergencyFundAmount || 0,
      emergencyFundMonths || 0,
      totalMonthlyExpenses || 0,
      lifeInsuranceNeed || 0,
      additionalCoverNeeded || 0,
    ];

    const result = await mysql.query(query, values);

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Report generated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
