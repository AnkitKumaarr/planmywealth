"use client";

import { useState } from "react";

export default function KidsExpensesForm({ data, onChange, errors }) {
  const [localChildren, setLocalChildren] = useState(data.children || []);

  // Handle number of kids change
  const handleNumberOfKidsChange = (newValue) => {
    onChange("numberOfKids", parseInt(newValue));
    
    const newLocalChildren = Array(parseInt(newValue))
      .fill(null)
      .map((_, index) => localChildren[index] || {});
    
    setLocalChildren(newLocalChildren);
  };

  // Handle child field changes
  const handleChildFieldChange = (index, field, value) => {
    const updatedChildren = [...localChildren];
    if (!updatedChildren[index]) {
      updatedChildren[index] = {};
    }
    updatedChildren[index][field] = value;
    console.log("updatedChildren", updatedChildren);
    setLocalChildren(updatedChildren);
    
    // Update parent data
    // onChange(`children[${index}].${field}`, value);
  };

  const InputField = ({ value, onChange, placeholder, error, isAmount }) => (
    <div className="relative">
      {isAmount && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          ₹
        </span>
      )}
      <input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        className={`w-full p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:outline-none focus:ring-green-500 text-sm
        ${isAmount ? "pl-8" : ""}
        `}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );

  const TableHeader = () => (
    <div className="grid grid-cols-5 gap-4 py-1 px-2 bg-gray-50 rounded-t-lg border-b border-gray-200 hidden md:grid">
      {/* <div className="font-medium text-gray-700">Child</div> */}
      <div className="font-medium text-gray-700">Age</div>
      <div className="font-medium text-gray-700">Education Age</div>
      <div className="font-medium text-gray-700">Education Expense</div>
      <div className="font-medium text-gray-700">Wedding Age</div>
      <div className="font-medium text-gray-700">Wedding Expense</div>
    </div>
  );

  const ChildRow = ({ index }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        {/* Mobile Labels + Inputs */}
        <div className="md:hidden space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <InputField
              value={localChildren[index]?.currentAge}
              onChange={(val) => handleChildFieldChange(index, 'currentAge', val)}
              placeholder="Age"
              error={errors?.children?.[index]?.currentAge}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education Age
            </label>
            <InputField
              value={localChildren[index]?.educationAge}
              onChange={(val) => handleChildFieldChange(index, 'educationAge', val)}
              placeholder="Education Age"
              error={errors?.children?.[index]?.educationAge}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education Expense
            </label>
            <InputField
              value={localChildren[index]?.educationExpenses}
              onChange={(val) => handleChildFieldChange(index, 'educationExpenses', val)}
              placeholder="Amount"
              error={errors?.children?.[index]?.educationExpenses}
              isAmount
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wedding Age
            </label>
            <InputField
              value={localChildren[index]?.weddingAge}
              onChange={(val) => handleChildFieldChange(index, 'weddingAge', val)}
              placeholder="Wedding Age"
              error={errors?.children?.[index]?.weddingAge}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wedding Expense
            </label>
            <InputField
              value={localChildren[index]?.weddingExpenses}
              onChange={(val) => handleChildFieldChange(index, 'weddingExpenses', val)}
              placeholder="Amount"
              error={errors?.children?.[index]?.weddingExpenses}
              isAmount
            />
          </div>
        </div>

        {/* Desktop View */}
        {/* <div className="hidden md:block font-medium text-gray-700">
          Child {index + 1}
        </div> */}
        <div className="hidden md:block">
          <InputField
            value={localChildren[index]?.currentAge}
            onChange={(val) => handleChildFieldChange(index, 'currentAge', val)}
            placeholder="Age"
            error={errors?.children?.[index]?.currentAge}
          />
        </div>
        <div className="hidden md:block">
          <InputField
            value={localChildren[index]?.educationAge}
            onChange={(val) => handleChildFieldChange(index, 'educationAge', val)}
            placeholder="Education Age"
            error={errors?.children?.[index]?.educationAge}
          />
        </div>
        <div className="hidden md:block">
          <InputField
            value={localChildren[index]?.educationExpenses}
            onChange={(val) => handleChildFieldChange(index, 'educationExpenses', val)}
            placeholder="Amount"
            error={errors?.children?.[index]?.educationExpenses}
            isAmount
          />
        </div>
        <div className="hidden md:block">
          <InputField
            value={localChildren[index]?.weddingAge}
            onChange={(val) => handleChildFieldChange(index, 'weddingAge', val)}
            placeholder="Wedding Age"
            error={errors?.children?.[index]?.weddingAge}
          />
        </div>
        <div className="hidden md:block">
          <InputField
            value={localChildren[index]?.weddingExpenses}
            onChange={(val) => handleChildFieldChange(index, 'weddingExpenses', val)}
            placeholder="Amount"
            error={errors?.children?.[index]?.weddingExpenses}
            isAmount
          />
        </div>
      </div>
    </div>
  );

  const calculateTotals = () => {
    if (!data.children || data.children.length === 0)
      return { education: 0, wedding: 0 };

    return data.children.reduce(
      (acc, child) => ({
        education: acc.education + (Number(child?.educationExpenses) || 0),
        wedding: acc.wedding + (Number(child?.weddingExpenses) || 0),
      }),
      { education: 0, wedding: 0 }
    );
  };

  const TotalExpensesSummary = () => {
    const totals = calculateTotals();

    return (
      <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Total Expenses Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="text-sm text-gray-600">
              Total Education Expenses
            </div>
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

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            What are your planned future expenses for your kids?
          </h2>
        </div>
        {/* Number of Kids Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <label className="text-lg font-medium text-gray-700 whitespace-nowrap">
            Number of Children
          </label>
          <select
            value={data.numberOfKids || 0}
            onChange={(e) => handleNumberOfKidsChange(e.target.value)}
            className="w-full sm:w-32 outline-none p-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-lg"
          >
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {data.numberOfKids > 0 && (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <TableHeader />
              {Array.from({ length: data.numberOfKids }).map((_, index) => (
                <ChildRow key={index} index={index} />
              ))}
            </div>

            <TotalExpensesSummary />
          </>
        )}
      </div>
    </div>
  );
}
