import { useFormData } from "@/context/FormContext";
import React, { useEffect } from "react";

const TotalExpensesSummary = ({ totals }) => {
  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Total Expenses Summary
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg border border-green-100">
          <div className="text-sm text-gray-600">Total Education Expenses</div>
          <div className="text-xl font-semibold text-gray-800 mt-1">
            ₹{totals.education.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg border border-green-100">
          <div className="text-sm text-gray-600">Total Wedding Expenses</div>
          <div className="text-xl font-semibold text-gray-800 mt-1">
            ₹{totals.wedding.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalExpensesSummary;
