"use client";

import { useState, useEffect } from "react";
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
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24  ">
      <div className="mb-8">
        <p className="text-[#004F27]  text-2xl md:text-4xl mb-2 font-semibold">
          Did you know that{" "}
          <span className=" font-bold mb-3 text-[#08AD5B]">80% people</span> who
          created their financial plan achieved their goals!

        </p>

        <div className="mt-6">
          <span className="text-white font-semibold bg-[#08AD5B] rounded-full px-4 sm:px-4 py-2 sm:py-3 text-sm md:text-lg">
            Start Your Journey Today!
          </span>
        </div>
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
            <div className="flex gap-3 flex-row justify-center items-center w-full">
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-[10px] px-2 sm:px-4 rounded-lg border border-1 transition-all duration-200 hover:shadow-md ${
                  formData.gender === "male"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-400 hover:border-gray-400"
                }`}
                onClick={() => {
                  setErrors({});
                  handleInputChange("gender", "male");
                }}
              >
                <span className="text-base sm:text-xl">♂️</span>
                <span className="text-sm sm:text-base font-medium">Male</span>
              </button>
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-[10px] px-2 sm:px-4 rounded-lg border border-1 transition-all duration-200 hover:shadow-md ${
                  formData.gender === "female"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-400 hover:border-gray-400"
                }`}
                onClick={() => {
                  setErrors({});
                  handleInputChange("gender", "female");
                }}
              >
                <span className="text-base sm:text-xl">♀️</span>
                <span className="text-sm sm:text-base font-medium">Female</span>
              </button>
            </div>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              What's your Age?
            </label>
            <select
              className={`w-full p-2 sm:p-3 border border-1 rounded-lg font-medium outline-none ${
                formData.age ? "border-gray-400" : "border-gray-400"
              }`}
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
              className={`w-full p-2 sm:p-3 border border-1 rounded-lg outline-none font-medium ${
                formData.pincode ? "border-gray-400" : "border-gray-400"
              }`}
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
