"use client";

import { createContext, useContext, useState, useEffect } from "react";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Restore data from localStorage when component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const savedCurrentStep = localStorage.getItem("currentStep");

    if (savedFormData) {
      try {
        const parsedFormData = JSON.parse(savedFormData);
        setFormData(parsedFormData);
        localStorage.removeItem("formData"); // Clear after restoring
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }

    if (savedCurrentStep) {
      try {
        const parsedStep = JSON.parse(savedCurrentStep);
        setCurrentStep(parsedStep);
        localStorage.removeItem("currentStep"); // Clear after restoring
      } catch (error) {
        console.error("Error parsing saved step:", error);
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        handleInputChange,
        errors,
        setErrors,
        setFormData,
        currentStep,
        setCurrentStep,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormData() {
  return useContext(FormContext);
}
