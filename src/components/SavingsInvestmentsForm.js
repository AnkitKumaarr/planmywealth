import { useState } from "react";

const SavingsInvestmentsForm = ({ data, onChange, errors }) => {
  const formatToIndianCurrency = (num) => {
    if (!num) return "";
    return `₹ ${num.toLocaleString("en-IN")}`;
  };

  const formatToWords = (num) => {
    if (!num || isNaN(num)) return "";
    const value = Number(num);
    if (value < 1000) return `₹ ${value}`;
    if (value < 100000) return `₹ ${(value / 1000).toFixed(1)} thousand`;
    if (value < 10000000) return `₹ ${(value / 100000).toFixed(1)} lakh`;
    return `₹ ${(value / 10000000).toFixed(1)} crore`;
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center">
        Do you have any major upcoming expenses?
      </h2>
      <p className="text-center text-gray-500">
        Large expenses like spouse's higher education, sibling’s higher
        education or wedding, paying off some financial liability on your
        family, etc.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasMajorExpenses === true
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => onChange("hasMajorExpenses", true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasMajorExpenses === false
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => onChange("hasMajorExpenses", false)}
        >
          No
        </button>
      </div>

      {data.hasMajorExpenses === true && (
        <div className="max-w-md mx-auto mt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                ₹
              </span>
              <input
                type="text"
                className={`w-full p-3 pl-7 border rounded-lg ${
                  errors?.majorExpensesAmount ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter total expenses amount..."
                value={data.majorExpensesAmount || ""}
                onChange={(e) =>
                  onChange("majorExpensesAmount", Number(e.target.value))
                }
              />
            </div>
          </div>
          {errors?.majorExpensesAmount && (
            <div className="text-red-500 text-sm mt-1">Enter your expense</div>
          )}
          {data.majorExpensesAmount > 0 && (
            <div className="text-sm text-gray-500 mt-2 text-right">
              {formatToWords(data.majorExpensesAmount)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavingsInvestmentsForm;
