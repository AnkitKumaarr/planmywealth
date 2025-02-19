import { useState } from "react";

const LifeCoverForm = ({ data, onChange, errors }) => {
  const [policies, setPolicies] = useState({
    termInsurance: "",
    personalAccidentInsurance: "",
    groupInsurance: "",
    traditionalInsurance: "",
    ulipInsurance: "",
    other: "",
  });

  const formatToWords = (num) => {
    if (!num || isNaN(num)) return "";
    const value = Number(num);
    if (value < 1000) return `₹ ${value}`;
    if (value < 100000) return `₹ ${(value / 1000).toFixed(1)} thousand`;
    if (value < 10000000) return `₹ ${(value / 100000).toFixed(1)} lakh`;
    return `₹ ${(value / 10000000).toFixed(1)} crore`;
  };

  const formatToIndianCurrency = (num) => {
    if (!num) return "";
    return `₹ ${num.toLocaleString("en-IN")}`;
  };

  const policyCategories = [
    { id: "termInsurance", label: "Term Insurance" },
    { id: "healthInsurance", label: "Health Insurance" },
    { id: "personalAccidentInsurance", label: "Personal Accident Insurance" },
    {
      id: "groupInsurance",
      label: "Group Insurance",
      subtitle: "(Employer provided)",
    },
    {
      id: "traditionalInsurance",
      label: "Traditional Insurance",
      subtitle: "(Endowment, Money Back, etc.)",
    },
    { id: "other", label: "Other" },
  ];

  const handlePolicyChange = (category, value) => {
    const newPolicies = { ...policies, [category]: value };
    setPolicies(newPolicies);

    // Calculate total
    const total = Object.values(newPolicies).reduce(
      (sum, val) => sum + (Number(val) || 0),
      0
    );

    // Update both individual values and total
    onChange("lifeCoverAmount", total);
    if (category === "termInsurance") {
      onChange("termInsuranceAmount", Number(value) || 0);
    }
    if (category === "healthInsurance") {
      onChange("healthInsuranceAmount", Number(value) || 0);
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center">
        Do you have an existing Term insurance/Health insurance?
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasLifeCover === true
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => onChange("hasLifeCover", true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasLifeCover === false
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => onChange("hasLifeCover", false)}
        >
          No
        </button>
      </div>

      {data.hasLifeCover && (
        <div className="space-y-4 mt-6">
          {policyCategories.map((category) => (
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
                    placeholder="Enter amount..."
                    value={policies[category.id]}
                    onChange={(e) =>
                      handlePolicyChange(category.id, e.target.value)
                    }
                  />
                </div>
                {policies[category.id] && Number(policies[category.id]) > 0 && (
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    {formatToWords(policies[category.id])}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium">Total Life Cover:</span>
            <span className="font-medium">
              {formatToIndianCurrency(data.lifeCoverAmount)}
            </span>
          </div>

          {errors.lifeCoverAmount && (
            <p className="text-sm text-red-600">
              Please enter at least one policy amount.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LifeCoverForm;
