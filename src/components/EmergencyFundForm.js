"use client";

import { useState } from "react";

export default function EmergencyFundForm({ data, onChange, errors }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-4">
            Do you have an emergency fund?
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Yes/No Selection */}
          <div className="relative">
            <div className="flex justify-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => {
                  onChange("hasEmergencyFund", true);
                }}
                className={`flex-1 max-w-[200px] py-3 px-6 rounded-lg border-2 transition-all duration-200 ${
                  data.hasEmergencyFund === true
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange("hasEmergencyFund", false);
                }}
                className={`flex-1 max-w-[200px] py-3 px-6 rounded-lg border-2 transition-all duration-200 ${
                  data.hasEmergencyFund === false
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                No
              </button>
            </div>
            {errors.hasEmergencyFund && (
              <p className="text-center mt-2 text-sm text-red-500">
                Please select an option
              </p>
            )}
          </div>

          {/* Emergency Fund Amount */}
          {data.hasEmergencyFund === true && (
            <div className="mt-4 max-w-md mx-auto">
              <label
                htmlFor="emergencyFundAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Emergency Fund Amount
              </label>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    ₹
                  </span>
                  <input
                    type="number"
                    id="emergencyFundAmount"
                    name="emergencyFundAmount"
                    value={data.emergencyFundAmount || ""}
                    onChange={(e) =>
                      onChange("emergencyFundAmount", Number(e.target.value))
                    }
                    placeholder="Enter emergency fund amount..."
                    className={`w-full p-3 pl-7 border rounded-lg ${
                      errors.emergencyFundAmount
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                </div>
              </div>
              {errors.emergencyFundAmount && (
                <p className="mt-2 text-sm text-red-600">
                  Please enter your emergency fund amount
                </p>
              )}
            </div>
          )}

          {/* Months of Expenses */}
          {data.hasEmergencyFund === true && (
            <div className="mt-4 max-w-md mx-auto">
              <label
                htmlFor="emergencyFundMonths"
                className="block text-sm font-medium text-gray-700"
              >
                Months of Expenses
              </label>
              <div className="flex items-center gap-2 mt-1">
                <select
                  id="emergencyFundMonths"
                  name="emergencyFundMonths"
                  value={data.emergencyFundMonths || ""}
                  onChange={(e) =>
                    onChange("emergencyFundMonths", Number(e.target.value))
                  }
                  className={`w-full p-3 border rounded-lg ${
                    errors.emergencyFundMonths
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <option value="">Select months</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                    <option key={month} value={month}>
                      {month} {month === 1 ? "month" : "months"}
                    </option>
                  ))}
                </select>
              </div>
              {errors.emergencyFundMonths && (
                <p className="mt-2 text-sm text-red-600">
                  Please select the number of months
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
