import { useState } from "react";

const LifeCoverForm = ({ data, onChange, errors }) => {
  const [policies, setPolicies] = useState([
    { id: 1, name: "", amount: "" }
  ]);

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

  const handleAddPolicy = () => {
    setPolicies([...policies, { 
      id: policies.length + 1, 
      name: "", 
      amount: "" 
    }]);
  };

  const handleRemovePolicy = (id) => {
    if (policies.length > 1) {
      const newPolicies = policies.filter(policy => policy.id !== id);
      setPolicies(newPolicies);
      updateTotal(newPolicies);
    }
  };

  const handlePolicyChange = (id, field, value) => {
    const newPolicies = policies.map(policy => 
      policy.id === id ? { ...policy, [field]: value } : policy
    );
    setPolicies(newPolicies);
    if (field === 'amount') {
      updateTotal(newPolicies);
    }
  };

  const updateTotal = (newPolicies) => {
    const total = newPolicies.reduce(
      (sum, policy) => sum + (Number(policy.amount) || 0),
      0
    );
    onChange("lifeCoverAmount", total);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center">
        Do you have an existing Term insurance/Life cover?
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
          {policies.map((policy) => (
            <div key={policy.id} className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <div className="relative bg-white rounded-lg border border-gray-400">
                  <input
                    type="text"
                    className="w-full p-4 outline-none rounded-lg"
                    placeholder="Enter insurance type..."
                    value={policy.name}
                    onChange={(e) => handlePolicyChange(policy.id, 'name', e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-2">
                <div className="relative bg-white rounded-lg border border-gray-400 flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ₹
                  </span>
                  <input
                    type="text"
                    className="w-full p-4 pl-7 outline-none rounded-lg"
                    placeholder="Enter amount..."
                    value={policy.amount}
                    onChange={(e) => handlePolicyChange(policy.id, 'amount', e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePolicy(policy.id)}
                  className="p-4 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddPolicy}
            className="w-full p-3 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            + Add Another Policy
          </button>

          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium">Total Life Cover:</span>
            <span className="font-medium">
              {formatToIndianCurrency(data.lifeCoverAmount)}
            </span>
          </div>
          
          {errors.lifeCoverAmount && (
            <p className="text-sm text-red-600">Please enter at least one policy amount.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LifeCoverForm;
