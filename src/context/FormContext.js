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
    allMonthlyExpenses: [],
    hasLoans: null,
    loanAmount: "",
    hasSavings: null,
    savingsAmount: "",
    knowsInvestments: null,
    totalInvestments: 0,
    hasLifeCover: null,
    lifeCoverAmount: 0,
    termInsuranceAmount: 0,
    healthInsuranceAmount: 0,
    numberOfKids: 1,
    children: [
      {
        currentAge: "",
        educationAge: "",
        educationExpenses: "",
        weddingAge: "",
        weddingExpenses: "",
      },
    ],
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
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }

    if (savedCurrentStep) {
      try {
        const parsedStep = JSON.parse(savedCurrentStep);
        setCurrentStep(parsedStep);
      } catch (error) {
        console.error("Error parsing saved step:", error);
      }
    }
    localStorage.removeItem("formData"); // Clear after restoring
    localStorage.removeItem("currentStep"); // Clear after restoring
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFormData = () => {
    setFormData({
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
      lifeCoverAmount: 0,
      termInsuranceAmount: 0,
      healthInsuranceAmount: 0,
      numberOfKids: 1,
      children: [],
      educationExpenses: "",
      weddingExpenses: "",
      hasEmergencyFund: null,
      emergencyFundAmount: "",
      emergencyFundMonths: "",
    });
    setCurrentStep(1);
    setErrors({});
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
        resetFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormData() {
  return useContext(FormContext);
}
