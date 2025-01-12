import { useState } from "react";
import Dialog from "./Dialog";

const IncomeForm = ({
  data,
  onChange,
  errors,
  setErrors,
  handleSalaryWarning,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  console.log("errors 22", errors);
  const incomeTypes = [
    "Salary",
    "Business Income",
    "Professional Fees",
    "Spouse's income",
    "Interest",
    "Dividend",
    "Rental Income",
    "Royalty",
    "Other",
  ];

  const addNewIncomeSource = () => {
    const newIncomeSources = [...data.incomeSources, { type: "", amount: "" }];
    onChange("incomeSources", newIncomeSources);
  };

  const removeIncomeSource = (index) => {
    const newIncomeSources = data.incomeSources.filter((_, i) => i !== index);
    onChange("incomeSources", newIncomeSources);
  };

  const updateIncomeSource = (index, field, value) => {
    const newIncomeSources = [...data.incomeSources];
    newIncomeSources[index] = {
      ...newIncomeSources[index],
      [field]: value,
    };
    onChange("incomeSources", newIncomeSources);
  };

  const calculateTotalIncome = () => {
    return data.incomeSources.reduce((total, source) => {
      return total + (parseInt(source.amount) || 0);
    }, 0);
  };

  const validateIncomeSource = (source) => {
    const errors = {};
    if (!source.type) errors.type = "Please select income type";
    if (!source.amount) errors.amount = "Please enter amount";
    return errors;
  };

  const handleAmountChange = (index, value) => {
    // Clear any existing errors
    setErrors({});

    // Update the income source
    updateIncomeSource(index, "amount", value);
  };

  return (
    <div className=" px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
        What are your sources of income?
      </h2>
      <p className="text-gray-600 text-center sm:text-left">
        Choose as many sources as applicable and the amount you earn from them.
        Don't forget your passive incomes like rental income you receive,
        interests on investments, etc.
      </p>

      <div className="space-y-4">
        {data.incomeSources.map((source, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center gap-4 relative"
          >
            <div className="flex-1 w-full sm:w-auto">
              <select
                className={`w-full p-3 border ${
                  errors[`${index}-type`] ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={source.type}
                onChange={(e) =>
                  updateIncomeSource(index, "type", e.target.value)
                }
              >
                <option value="">Select Income Type</option>
                {incomeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors[`${index}-type`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`${index}-type`]}
                </p>
              )}
            </div>
            <div className="flex-1 flex items-center gap-2 w-full sm:w-auto relative">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  className={`w-full p-3 pl-8 pr-24 border ${
                    errors[`${index}-amount`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg`}
                  placeholder="Amount"
                  value={source.amount}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">
                  per annum
                </span>
              </div>
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeIncomeSource(index)}
                className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={addNewIncomeSource}
          className="text-green-500 hover:text-green-600"
        >
          + Add More
        </button>
      </div>

      {calculateTotalIncome() > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Income:</span>
            <span className="text-xl font-semibold">
              ₹{calculateTotalIncome().toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        All sensitive data is stored anonymously and not accessible to anyone.
      </div>

      <Dialog
        isOpen={errors?.SalaryWarning === true}
        onClose={() => setErrors({ ...errors, SalaryWarning: false })}
        onConfirm={handleSalaryWarning}
        title="Have you entered your annual income?"
        message="Hey, would you like to recheck the annual income you've entered? Your range of choices with respect to the term plan will be limited for the current income you've entered."
      />
    </div>
  );
};

export default IncomeForm;
