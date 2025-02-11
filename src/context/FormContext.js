"use client";

import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    pincode: "",
    gender: "",
    education: "",
    disease: "",
    smoking: "",
    alcohol: "",
    incomeSources: [{ type: "", amount: "" }],
    incomeStability: "",
    retirementAge: "",
    hasDependents: null,
    dependents: [],
    nomineeReaction: "",
    knowsLivingExpenses: null,
    monthlyExpenses: 0,
    hasLoans: null,
    loanAmount: "",
    hasSavings: null,
    savingsAmount: "",
    knowsInvestments: null,
    totalInvestments: 0,
    hasLifeCover: null,
    numberOfKids: 1,
    children: [],
    educationExpenses: "",
    weddingExpenses: "",
    hasEmergencyFund: null,
    emergencyFundAmount: "",
    emergencyFundMonths: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider
      value={{ formData, handleInputChange, errors, setErrors }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormData() {
  return useContext(FormContext);
}
