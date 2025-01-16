"use client";

import { useFormData } from "@/context/FormContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignInDialog from "./SignInDialog";
import { useAuth } from "@/context/AuthContext";

export default function Review({ onBackStep, setCurrentStep }) {
  const { user } = useAuth();
  const { formData } = useFormData();
  const router = useRouter();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleEdit = (step) => {
    setCurrentStep(step);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace(/^₹/, "₹ ");
  };

  const handleGenerateReport = () => {
    if (!user) {
      setIsSignInOpen(true);
    } else {
      generateReport();
      // call the API to store the whole data
    }
  };

  const generateReport = async () => {
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const data = await response.json();
      if (data.success) {
        // router.push("/generatereport");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating report:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isSignInOpen && (
        <SignInDialog
          isOpen={isSignInOpen}
          onClose={() => setIsSignInOpen(false)}
        />
      )}
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          Summary of your details
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please confirm if all the details shown below are correct. You will
          not be able to make
          <span className="font-bold"> any</span> changes once the report is
          generated.
        </p>

        <button
          onClick={onBackStep}
          className="flex items-center text-gray-600 mb-6"
        >
          ← Back
        </button>

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-green-600">1. BASIC</h2>
              <button
                onClick={() => handleEdit(1)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✏️ Edit
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                Name:{" "}
                <strong>
                  {formData.firstName} {formData.lastName}
                </strong>
              </p>
              <p>
                Date of birth: <strong>{formData.dateOfBirth}</strong>
              </p>
              <p>
                Gender: <strong>{formData.gender}</strong>
              </p>
              <p>
                Highest Education: <strong>{formData.education}</strong>
              </p>
              <p>
                Smoke or chew tobacco: <strong>{formData.smoking}</strong>
              </p>
              <p>
                Consume alcohol: <strong>{formData.alcohol}</strong>
              </p>
            </div>
          </div>

          {/* Income */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-green-600">
                2. INCOME
              </h2>
              <button
                onClick={() => handleEdit(5)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✏️ Edit
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                Total sources of income: ₹{" "}
                <strong>{formData.totalIncome}</strong> crore
              </p>
              <p>
                10-15 years income stability:{" "}
                <strong>{formData.incomeStability}</strong>
              </p>
              <p>
                Retirement age from work:{" "}
                <strong>{formData.retirementAge}</strong> yrs
              </p>
            </div>
          </div>

          {/* Dependants */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-green-600">
                3. DEPENDANTS
              </h2>
              <button
                onClick={() => handleEdit(8)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✏️ Edit
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                Dependant family members:{" "}
                <strong>{formData.dependents?.length || 0}</strong> members
              </p>
              <p>
                How will nominee react to 2 Cr in bank account?:{" "}
                <strong>{formData.nomineeReaction}</strong>
              </p>
            </div>
          </div>

          {/* Assets & Liabilities */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-green-600">
                4. ASSETS & LIABILITIES
              </h2>
              <button
                onClick={() => handleEdit(10)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✏️ Edit
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                Living expenses of dependant members: ₹{" "}
                <strong>{formData.monthlyExpenses}</strong> lakh per month
              </p>
              <p>
                Large loans or advances: ₹{" "}
                <strong>{formData.loanAmount}</strong> thousand
              </p>
              <p>
                Major upcoming expenses: ₹{" "}
                <strong>{formData.upcomingExpenses}</strong> thousand
              </p>
              <p>
                Current invested amount: ₹{" "}
                <strong>{formData.totalInvestments || 0}</strong>
              </p>
              <p>
                Existing life cover: ₹{" "}
                <strong>{formData.lifeCoverAmount}</strong>
              </p>
              <p>
                Planned expenses for kids: ₹{" "}
                <strong>
                  {formData.educationExpenses + formData.weddingExpenses}
                </strong>{" "}
                for <strong>{formData.numberOfKids}</strong> Kids
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              // onClick={() => router.push("/generate-report")}
              onClick={handleGenerateReport}
              className="w-7/12  bg-green-500 text-white py-4 rounded-full hover:bg-green-600 transition-colors mt-8"
            >
              Confirm & Generate report
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
