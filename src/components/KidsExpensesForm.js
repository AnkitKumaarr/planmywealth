"use client";

import { useState } from "react";

export default function KidsExpensesForm({ data, onChange, errors }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            What are your planned expenses for your kids?
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Number of Kids */}
          <div className="flex flex-col sm:flex-row  w-full justify-between">
            <label className="block text-base font-medium text-gray-700 mb-2 sm:mb-0">
              1. How Many Kids:
            </label>
            <div className="relative w-full sm:w-1/2">
              <select
                name="numberOfKids"
                value={data.numberOfKids || 0}
                onChange={(e) => {
                  onChange("numberOfKids", parseInt(e.target.value));
                }}
                className={`w-full p-3 border ${
                  errors.numberOfKids ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-green-500 text-lg`}
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {errors.numberOfKids && (
                <p className="mt-1 text-sm text-red-500 text-right">
                  Please select number of kids
                </p>
              )}
            </div>
          </div>

          {/* Education Expenses */}
          <div className="flex flex-col sm:flex-row  w-full justify-between">
            <label className="block text-base font-medium text-gray-700 mb-2 sm:mb-0">
              2. Education Expenses
              <span
                className="ml-1 text-gray-400 cursor-help"
                title="Enter the estimated education expenses per child"
              >
                ⓘ
              </span>
            </label>
            <div className="relative w-full sm:w-1/2">
              <span className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <input
                type="number"
                name="educationExpenses"
                value={data.educationExpenses || ""}
                onChange={(e) =>
                  onChange("educationExpenses", Number(e.target.value))
                }
                placeholder="Enter an estimate"
                className={`w-full pl-8 p-3 border ${
                  errors.educationExpenses
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-green-500 text-lg`}
              />
              <p className="text-sm text-gray-500 mt-0 text-right">
                {errors.educationExpenses ? (
                  <p className="mt-1 text-sm text-red-500">
                    Please enter education expenses
                  </p>
                ) : (
                  "cost in today's times"
                )}
              </p>
            </div>
          </div>

          {/* Wedding Expenses */}
          <div className="flex flex-col sm:flex-row  w-full justify-between">
            <label className="block text-base font-medium text-gray-700 mb-2 sm:mb-0">
              3. Wedding expenses
              <span
                className="ml-1 text-gray-400 cursor-help"
                title="Enter the estimated wedding expenses per child"
              >
                ⓘ
              </span>
            </label>
            <div className="relative w-full sm:w-1/2">
              <span className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <input
                type="number"
                name="weddingExpenses"
                value={data.weddingExpenses || ""}
                onChange={(e) =>
                  onChange("weddingExpenses", Number(e.target.value))
                }
                placeholder="Enter an estimate"
                className={`w-full pl-8 p-3 border ${
                  errors.weddingExpenses ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-green-500 text-lg`}
              />
              <p className="text-sm text-gray-500 mt-0 text-right">
                {errors.weddingExpenses ? (
                  <p className="mt-1 text-sm text-red-500">
                    Please enter wedding expenses
                  </p>
                ) : (
                  "cost in today's times"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
