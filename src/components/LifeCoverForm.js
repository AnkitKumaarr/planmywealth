import { useState } from "react";

const LifeCoverForm = ({ data, onChange, errors }) => {
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
        Do you have an existing life cover?
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
        <div className="mt-4 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                ₹
              </span>
              <input
                type="number"
                id="lifeCoverAmount"
                name="lifeCoverAmount"
                value={data.lifeCoverAmount || ""}
                onChange={(e) =>
                  onChange("lifeCoverAmount", Number(e.target.value))
                }
                className={`w-full p-3 pl-7 border rounded-lg ${
                  errors.lifeCoverAmount ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter life cover amount..."
              />
            </div>
          </div>
          {errors.lifeCoverAmount && (
            <p className="mt-2 text-sm text-red-600">This field is required.</p>
          )}
          {data.lifeCoverAmount > 0 && (
            <div className="text-sm text-gray-500 mt-2 text-right">
              {formatToWords(data.lifeCoverAmount)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LifeCoverForm;
