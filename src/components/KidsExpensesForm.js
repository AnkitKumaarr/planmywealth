"use client";

import { useState, useEffect, useCallback } from "react";
import React from "react";
import TotalExpensesSummary from "./TotalExpensesSummary";

const InputField = React.memo(
  ({ value, onChange, placeholder, error, isAmount, name }) => (
    <div className="relative">
      {isAmount && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          ₹
        </span>
      )}
      <input
        type="number"
        min="0"
        value={value || ""}
        name={name}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val >= 0) {
            onChange(val);
          }
        }}
        placeholder={placeholder}
        className={`w-full p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:outline-none focus:ring-green-500 text-sm
      ${isAmount ? "pl-8" : ""}
      `}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
);

InputField.displayName = "InputField";

const ChildRow = React.memo(({ index, childData, onFieldChange, errors }) => {
  const handleChange = useCallback(
    (field, value) => {
      onFieldChange(index, field, value);
    },
    [index, onFieldChange]
  );

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Mobile Labels + Inputs */}
        <div className="md:hidden space-y-4">
          <div className="font-medium text-gray-700 text-lg mb-2">
            Child {index + 1}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <InputField
              value={childData?.currentAge}
              onChange={(val) => handleChange("currentAge", val)}
              placeholder="Age"
              error={errors?.children?.[index]?.currentAge}
              name={`child-${index}-age`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age of Higher Education{" "}
            </label>
            <InputField
              value={childData?.educationAge}
              onChange={(val) => handleChange("educationAge", val)}
              placeholder="Age of Higher Education"
              error={errors?.children?.[index]?.educationAge}
              name={`child-${index}-education-age`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education Expense
            </label>
            <InputField
              value={childData?.educationExpenses}
              onChange={(val) => handleChange("educationExpenses", val)}
              placeholder="Amount"
              error={errors?.children?.[index]?.educationExpenses}
              isAmount
              name={`child-${index}-education-expenses`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wedding Age
            </label>
            <InputField
              value={childData?.weddingAge}
              onChange={(val) => handleChange("weddingAge", val)}
              placeholder="Wedding Age"
              error={errors?.children?.[index]?.weddingAge}
              name={`child-${index}-wedding-age`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wedding Expense
            </label>
            <InputField
              value={childData?.weddingExpenses}
              onChange={(val) => handleChange("weddingExpenses", val)}
              placeholder="Amount"
              error={errors?.children?.[index]?.weddingExpenses}
              isAmount
              name={`child-${index}-wedding-expenses`}
            />
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block w-[12%]">
          <InputField
            value={childData?.currentAge}
            onChange={(val) => handleChange("currentAge", val)}
            placeholder="Age"
            error={errors?.children?.[index]?.currentAge}
            name={`child-${index}-age-desktop`}
          />
        </div>
        <div className="hidden md:block w-[12%]">
          <InputField
            value={childData?.educationAge}
            onChange={(val) => handleChange("educationAge", val)}
            placeholder="Age of Higher Education"
            error={errors?.children?.[index]?.educationAge}
            name={`child-${index}-education-age-desktop`}
          />
        </div>
        <div className="hidden md:block flex-1">
          <InputField
            value={childData?.educationExpenses}
            onChange={(val) => handleChange("educationExpenses", val)}
            placeholder="Amount"
            error={errors?.children?.[index]?.educationExpenses}
            isAmount
            name={`child-${index}-education-expenses-desktop`}
          />
        </div>
        <div className="hidden md:block w-[12%]">
          <InputField
            value={childData?.weddingAge}
            onChange={(val) => handleChange("weddingAge", val)}
            placeholder="Wedding Age"
            error={errors?.children?.[index]?.weddingAge}
            name={`child-${index}-wedding-age-desktop`}
          />
        </div>
        <div className="hidden md:block flex-1">
          <InputField
            value={childData?.weddingExpenses}
            onChange={(val) => handleChange("weddingExpenses", val)}
            placeholder="Amount"
            error={errors?.children?.[index]?.weddingExpenses}
            isAmount
            name={`child-${index}-wedding-expenses-desktop`}
          />
        </div>
      </div>
    </div>
  );
});

ChildRow.displayName = "ChildRow";

const TableHeader = React.memo(() => (
  <div className="hidden md:flex items-center gap-6 py-1 px-2 bg-gray-50 rounded-t-lg border-b border-gray-200">
    <div className="font-medium text-gray-700 w-[12%]">Age</div>
    <div className="font-medium text-gray-700 w-[12%]">
      Age of Higher Education
    </div>
    <div className="font-medium text-gray-700 flex-1">Education Expense</div>
    <div className="font-medium text-gray-700 w-[12%]">Wedding Age</div>
    <div className="font-medium text-gray-700 flex-1">Wedding Expense</div>
  </div>
));

TableHeader.displayName = "TableHeader";

export default function KidsExpensesForm({ data, onChange, errors }) {
  const [localChildren, setLocalChildren] = useState(data.children || []);
  const [numberOfKids, setNumberOfKids] = useState(data.numberOfKids || 0);
  const [totals, setTotals] = useState({ education: 0, wedding: 0 });

  // Sync local state with props when data changes
  useEffect(() => {
    setLocalChildren(data.children || []);
    setNumberOfKids(data.numberOfKids || 0);
  }, [data.children, data.numberOfKids]);

  // Handle number of kids change
  const handleNumberOfKidsChange = useCallback(
    (newValue) => {
      const numKids = parseInt(newValue);
      setNumberOfKids(numKids);

      const newLocalChildren = Array(numKids)
        .fill(null)
        .map((_, index) => localChildren[index] || {});

      setLocalChildren(newLocalChildren);

      // Batch update to parent
      requestAnimationFrame(() => {
        onChange("numberOfKids", numKids);
        onChange("children", newLocalChildren);
      });
    },
    [localChildren, onChange]
  );

  // Handle child field changes
  const handleChildFieldChange = useCallback(
    (index, field, value) => {
      setLocalChildren((prevChildren) => {
        const updatedChildren = [...prevChildren];
        if (!updatedChildren[index]) {
          updatedChildren[index] = {};
        }
        updatedChildren[index][field] = value;

        const totals = updatedChildren.reduce(
          (acc, child) => ({
            education: acc.education + (Number(child?.educationExpenses) || 0),
            wedding: acc.wedding + (Number(child?.weddingExpenses) || 0),
          }),
          { education: 0, wedding: 0 }
        );

        setTotals(totals);

        // Batch update to parent
        requestAnimationFrame(() => {
          onChange("children", updatedChildren);
          onChange("educationExpenses", totals.education);
          onChange("weddingExpenses", totals.wedding);
        });

        return updatedChildren;
      });
    },
    [onChange]
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            What are your planned future expenses for your kids?
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <label className="text-lg font-medium text-gray-700 whitespace-nowrap">
            Number of Children
          </label>
          <select
            value={numberOfKids}
            onChange={(e) => handleNumberOfKidsChange(e.target.value)}
            className="w-full sm:w-32 outline-none p-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-lg"
            aria-label="Select number of children"
          >
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {numberOfKids > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <TableHeader />
            {Array.from({ length: numberOfKids }).map((_, index) => (
              <ChildRow
                key={`child-row-${index}`}
                index={index}
                childData={localChildren[index]}
                onFieldChange={handleChildFieldChange}
                errors={errors}
              />
            ))}
          </div>
        )}
      </div>
      <TotalExpensesSummary totals={totals} />
      <div className="grid md:grid-cols-2 gap-4 my-8">
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <p className="text-gray-700 text-sm">
            <span className="text-3xl font-bold text-green-600 mb-2">40% </span>
            of parents use their retirement fund for their children's education
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <p className="text-gray-700 text-sm">
            <span className="text-3xl font-bold text-green-600 mb-2">75% </span>
            of parents use their retirement fund for their children's marriage
          </p>
        </div>
      </div>
    </div>
  );
}
