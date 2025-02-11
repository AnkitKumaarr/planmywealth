import { useState } from "react";

const LoansAdvancesForm = ({ data, onChange, errors }) => {
  const [loans, setLoans] = useState({
    homeLoan: "",
    carLoan: "",
    personalLoan: "",
    businessLoan: "",
    other: "",
  });

  const handleOptionSelect = (hasLoans) => {
    onChange("hasLoans", hasLoans);
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

  const loanCategories = [
    { id: "homeLoan", label: "Home Loan" },
    { id: "carLoan", label: "Car Loan" },
    { id: "personalLoan", label: "Personal Loan" },
    { id: "businessLoan", label: "Business Loan" },
    { id: "other", label: "Other Loans" },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center">
        Have you taken any large loans or advances?
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`px-12 py-3 rounded-lg ${
            data.hasLoans === true
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
            data.hasLoans === false
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => handleOptionSelect(false)}
        >
          No
        </button>
      </div>

      {data.hasLoans === true && (
        <div className="space-y-4 mt-6">
          {loanCategories.map((category) => (
            <div key={category.id} className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <div className="bg-gray-200 p-4 rounded-lg">
                  <div className="font-medium">{category.label}</div>
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
                    placeholder="Enter loan amount..."
                    value={loans[category.id]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLoans((prev) => ({
                        ...prev,
                        [category.id]: value,
                      }));
                      const newTotal = Object.entries({
                        ...loans,
                        [category.id]: value,
                      }).reduce(
                        (sum, [key, val]) => sum + (Number(val) || 0),
                        0
                      );
                      onChange("loanAmount", newTotal);
                    }}
                  />
                </div>
                {loans[category.id] && Number(loans[category.id]) > 0 && (
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    {formatToWords(loans[category.id])}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium">Total Loan Amount:</span>
            <span className="font-medium">
              {formatToIndianCurrency(data.loanAmount)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoansAdvancesForm;
