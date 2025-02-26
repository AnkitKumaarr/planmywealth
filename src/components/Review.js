"use client";

import { useFormData } from "@/context/FormContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignInDialog from "./SignInDialog";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Loader";

export default function Review({ onBackStep, setCurrentStep }) {
  const { user, handleSignInOpen, isSignInOpen } = useAuth();
  const { formData } = useFormData();
  const router = useRouter();
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
      handleSignInOpen(true);
    } else {
      generateReport();
      // call the API to store the whole data
    }
  };

  const generateReport = async () => {
    try {
      setIsLoading(true);
      const uuid = uuidv4();
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, uuid }),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/generatereport?uuid=${uuid}`);
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
          onClose={() => handleSignInOpen(false)}
        />
      )}
      <div className="max-w-3xl mx-auto pt-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Summary of your details
        </h2>
        <p className="text-center text-sm text-gray-600 mb-2 px-4">
          Please confirm if all the details shown below are correct. You will
          not be able to make
          <span className="font-bold"> any</span> changes once the report is
          generated.
        </p>

        <button
          onClick={onBackStep}
          className="flex items-center text-gray-600 mb-6 px-4"
        >
          ← Back
        </button>

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md font-semibold text-green-600">1. BASIC</h2>
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
              {/* <p>
                Date of birth: <strong>{formData.dateOfBirth}</strong>
              </p> */}
              <p>
                Gender: <strong>{formData.gender}</strong>
              </p>
              <p>
                Phone Number: <strong>{formData.phoneNumber}</strong>
              </p>
              <p>
                Highest Education: <strong>{formData.education}</strong>
              </p>
              <p>
                Disease: <strong>{formData.disease ? "Yes" : "No"}</strong>
              </p>
              {formData?.userDisease && (
                <p>
                  User Disease: <strong>{formData?.userDisease}</strong>
                </p>
              )}
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
              <h2 className="text-md font-semibold text-green-600">
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
                <strong>
                  {formData.incomeSources.reduce((total, source) => {
                    return total + (parseInt(source.amount) || 0);
                  }, 0)}
                </strong>{" "}
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
              <h2 className="text-md font-semibold text-green-600">
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
          <div className="mb-24 sm:mb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md font-semibold text-green-600">
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
                <strong>{formData.totalMonthlyExpenses}</strong>
              </p>
              <p>
                Large loans or advances: ₹{" "}
                <strong>{formData.loanAmount}</strong>
              </p>
              <p>
                Major upcoming expenses: ₹{" "}
                <strong>{formData.upcomingExpenses}</strong>
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
              <p>
                Emergency fund: ₹{" "}
                <strong>{formData.emergencyFundAmount}</strong>
              </p>
            </div>
          </div>

          <div className="flex justify-center  w-full fixed bottom-0 left-0 right-0 sm:relative bg-white  sm:bg-transparent sm:p-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] sm:shadow-none">
            <button
              onClick={handleGenerateReport}
              className="w-7/12  bg-green-500 text-white text-center p-4 rounded-full hover:bg-green-600 transition-colors mt-8 mb-4"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader size="24px" />
                </div>
              ) : (
                "Confirm & Generate report"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
