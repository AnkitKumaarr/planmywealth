"use client";

import { useState } from "react";
import { useFormData } from "../context/FormContext";
import { useRouter } from "next/navigation";

const InsuranceForm = () => {
  const router = useRouter();
  const { formData, handleInputChange, errors, setErrors } = useFormData();

  const validate = () => {
    const newErrors = {};
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.pincode) newErrors.pincode = "Pincode is required.";
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Calculate DOB from age
    const today = new Date();
    const birthYear = today.getFullYear() - parseInt(formData.age);
    const dateOfBirth = `${birthYear}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;

    // Update context with form data
    handleInputChange("dateOfBirth", dateOfBirth);

    // Navigate to next page
    router.push("/basic-details");
  };

  return (
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className=" text-purple-600 text-xl sm:text-xl mb-4 font-bold md:block">
          <span className="hidden md:block">How much cover?</span>
          <span>Which Term Insurance is best?</span>
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6">
          Every question you have about buying Term Insurance answered in a
          personalized report
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-8 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Select your gender
            </label>
            <div className="flex gap-2 sm:gap-4">
              <button
                type="button"
                className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg border ${
                  formData.gender === "male"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setErrors({});
                  handleInputChange("gender", "male");
                }}
              >
                ♂️ Male
              </button>
              <button
                type="button"
                className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg border ${
                  formData.gender === "female"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setErrors({});
                  handleInputChange("gender", "female");
                }}
              >
                ♀️ Female
              </button>
            </div>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              What's your Age?
            </label>
            <select
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
              value={formData.age}
              onChange={(e) => {
                setErrors({});
                handleInputChange("age", e.target.value);
              }}
            >
              <option value="">Select Age</option>
              {[...Array(53)].map((_, i) => (
                <option key={i + 18} value={i + 18}>
                  {i + 18} years
                </option>
              ))}
            </select>
            {errors.age && <p className="text-red-500">{errors.age}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              What's your Pincode?
            </label>
            <input
              type="text"
              placeholder="Enter Pincode"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
              value={formData.pincode}
              onChange={(e) => {
                setErrors({});
                handleInputChange("pincode", e.target.value);
              }}
              maxLength={6}
            />
            {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 sm:mt-8 bg-green-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Get Started
        </button>
      </form>
    </div>
  );
};

export default InsuranceForm;
