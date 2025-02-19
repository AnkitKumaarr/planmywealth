import { useState } from "react";

const InvestmentsForm = ({ data, onChange, errors }) => {
  const [investments, setInvestments] = useState([{ type: "", amount: "" }]);

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

  const handleOptionSelect = (knowsInvestments) => {
    onChange("knowsInvestments", knowsInvestments);
  };

  const handleInvestmentChange = (index, value) => {
    const newInvestments = [...investments];
    newInvestments[index].amount = value;
    setInvestments(newInvestments);

    // Calculate total
    const total = newInvestments.reduce(
      (sum, inv) => sum + (Number(inv.amount) || 0),
      0
    );
    onChange("totalInvestments", total);
  };

  const addNewInvestment = () => {
    setInvestments([...investments, { type: "", amount: "" }]);
  };

  const removeInvestment = (index) => {
    const newInvestments = investments.filter((_, i) => i !== index);
    setInvestments(newInvestments);

    // Recalculate total
    const total = newInvestments.reduce(
      (sum, inv) => sum + (Number(inv.amount) || 0),
      0
    );
    onChange("totalInvestments", total);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-2xl font-semibold text-center">
          Do you know your total investments?
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Your existing investments help us calculate a suitable cover amount
          for your family. We will never share this information with any third
          party.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`px-12 py-3 rounded-lg ${
            data.knowsInvestments === true
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
            data.knowsInvestments === false
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => handleOptionSelect(false)}
        >
          No, Help Me Calculate
        </button>
      </div>

      {data.knowsInvestments === true && (
        <div className="max-w-md mx-auto mt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                ₹
              </span>
              <input
                type="text"
                className={`w-full p-3 pl-7 border rounded-lg appearance-none [&::-webkit-inner-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:h-[80%] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-outer-spin-button]:h-[80%] ${
                  errors?.totalInvestments
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                placeholder="Enter total investments amount..."
                value={data.totalInvestments || ""}
                onChange={(e) => onChange("totalInvestments", e.target.value)}
              />
            </div>
          </div>
          {errors?.totalInvestments && (
            <div className="text-red-500 text-sm mt-1">
              Please enter your total investments
            </div>
          )}
          {data.totalInvestments > 0 && (
            <div className="text-sm text-gray-500 mt-2 text-right">
              {formatToWords(data.totalInvestments)}
            </div>
          )}
        </div>
      )}

      {data.knowsInvestments === false && (
        <div className="space-y-4 mt-6">
          {investments.map((investment, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <div className="bg-gray-200 p-4 rounded-lg">
                  <select
                    className="w-full bg-transparent outline-none"
                    value={investment.type}
                    onChange={(e) => {
                      const newInvestments = [...investments];
                      newInvestments[index].type = e.target.value;
                      setInvestments(newInvestments);
                    }}
                  >
                    <option value="">Select Investment Type</option>
                    <option value="fd">Fixed Deposits</option>
                    <option value="stocks">Stocks</option>
                    <option value="mf">Mutual Funds</option>
                    <option value="ppf">PPF</option>
                    <option value="epf">EPF</option>
                    <option value="rd">Recurring Deposits</option>
                    <option value="other">Other</option>
                  </select>
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
                    placeholder="Enter amount..."
                    value={investment.amount}
                    onChange={(e) =>
                      handleInvestmentChange(index, e.target.value)
                    }
                  />
                </div>
                {investment.amount && Number(investment.amount) > 0 && (
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    {formatToWords(investment.amount)}
                  </div>
                )}
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeInvestment(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addNewInvestment}
            className="text-green-500 hover:text-green-600 flex items-center gap-2"
          >
            + Add More Investments
          </button>

          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium">Total Investments:</span>
            <span className="font-medium">
              {formatToIndianCurrency(data.totalInvestments)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentsForm;
