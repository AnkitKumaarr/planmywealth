import React from "react";

const Disease = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center">
        Do you have any existing diseases?
      </h2>
      <p className="text-center text-gray-500">
        "Say 'Yes' if you have any existing diseases."
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.disease === true
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => onChange("disease", true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.disease === false
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => onChange("disease", false)}
        >
          No
        </button>
      </div>

      {data.disease === true && (
        <div className="max-w-md mx-auto mt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                className={`w-full p-3 pl-7 border rounded-lg ${errors?.userDisease}`}
                placeholder="Enter your disease (Sugar, Blood Pressure, etc.)"
                value={data.userDisease || ""}
                onChange={(e) => onChange("userDisease", e.target.value)}
              />
            </div>
          </div>
          {errors?.userDisease && (
            <div className="text-red-500 text-sm mt-1">Enter your disease</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Disease;
