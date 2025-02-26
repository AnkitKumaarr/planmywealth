import { useState } from "react";
import ProgressIndicator from "./ProgressIndicator";

const LivingExpensesForm = ({ data, onChange, errors }) => {
  const [expenses, setExpenses] = useState(data.expenses || {});

  const handleOptionSelect = (knowsExpenses) => {
    onChange("knowsLivingExpenses", knowsExpenses);
    if (!knowsExpenses) {
      setExpenses(data.expenses || {});
    }
  };

  const handleExpenseChange = (category, value) => {
    if (value === "" || /^\d+$/.test(value)) {
      const newExpenses = { ...expenses, [category]: value };
      setExpenses(newExpenses);

      const total = Object.values(newExpenses).reduce(
        (sum, val) => sum + (Number(val) || 0),
        0
      );

      onChange("expenses", newExpenses);
      onChange("totalMonthlyExpenses", total);
    }
  };

  const handleTotalExpenseChange = (value) => {
    if (value === "" || /^\d+$/.test(value)) {
      const numericValue = value === "" ? "" : Number(value);
      onChange("totalMonthlyExpenses", numericValue);
    }
  };

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

  const expenseCategories = [
    { id: "houseRent", label: "House Rent" },
    { id: "schoolFees", label: "School Fees" },
    {
      id: "utilities",
      label: "Utilities",
      subtitle: "(Electricity + Gas + Internet + house maintenance etc.)",
    },
    { id: "vehicleMaintenance", label: "Vehicle Maintenance & Fuel" },
    { id: "salaries", label: "Salaries to maids/drivers" },
    { id: "groceries", label: "Groceries" },
    {
      id: "foodEntertainment",
      label: "Food/Entertainment",
      subtitle: "(Subscriptions)",
    },
    { id: "other", label: "Other" },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center">
        Do you know the monthly living expenses of your dependent family
        members?
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`px-12 py-3 rounded-lg ${
            data.knowsLivingExpenses === true
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => handleOptionSelect(true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`px-12 py-3 rounded-lg ${
            data.knowsLivingExpenses === false
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => handleOptionSelect(false)}
        >
          No, Help Me Calculate
        </button>
      </div>

      {data.knowsLivingExpenses === true && (
        <div className="max-w-md mx-auto mt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                ₹
              </span>
              <input
                type="text"
                className={`w-full p-3 pl-7 border rounded-lg ${
                  errors?.totalMonthlyExpenses
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                placeholder="15000"
                value={data.totalMonthlyExpenses || ""}
                onChange={(e) => handleTotalExpenseChange(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                per month
              </span>
            </div>
          </div>
          {errors?.totalMonthlyExpenses && (
            <div className="text-red-500 text-sm mt-1">
              Please enter the monthly expenses
            </div>
          )}
          {data.totalMonthlyExpenses > 0 && (
            <div className="text-sm text-gray-500 mt-2 text-right">
              {formatToWords(data.totalMonthlyExpenses)}
            </div>
          )}
        </div>
      )}

      {data.knowsLivingExpenses === false && (
        <div className="space-y-4 mt-6">
          {expenseCategories.map((category) => (
            <div key={category.id} className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <div className="bg-gray-200 p-4 rounded-lg">
                  <div className="font-medium">{category.label}</div>
                  {category.subtitle && (
                    <div className="text-sm text-gray-600">
                      {category.subtitle}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="relative bg-white rounded-lg border border-gray-200">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ₹
                  </span>
                  <input
                    type="text"
                    className="w-full p-4 pl-7 outline-none rounded-lg"
                    placeholder="Enter estimate..."
                    value={expenses[category.id] || ""}
                    onChange={(e) =>
                      handleExpenseChange(category.id, e.target.value)
                    }
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    per month
                  </span>
                </div>
                {expenses[category.id] && Number(expenses[category.id]) > 0 && (
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    {formatToWords(expenses[category.id])}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium">Total Expenses:</span>
            <span className="font-medium">
              {formatToIndianCurrency(data.totalMonthlyExpenses)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivingExpensesForm;
