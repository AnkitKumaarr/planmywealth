"use client";

import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import HabitsQuestion from "@/components/HabitsQuestion";
import IncomeForm from "@/components/IncomeForm";
import IncomeStabilityForm from "@/components/IncomeStabilityForm";
import RetirementAgeForm from "@/components/RetirementAgeForm";
import DependentsForm from "@/components/DependentsForm";
import NomineeReactionForm from "@/components/NomineeReactionForm";
import LivingExpensesForm from "@/components/LivingExpensesForm";
import LoansAdvancesForm from "@/components/LoansAdvancesForm";
import SavingsInvestmentsForm from "@/components/SavingsInvestmentsForm";
import InvestmentsForm from "@/components/InvestmentsForm";
import LifeCoverForm from "@/components/LifeCoverForm";
import KidsExpensesForm from "@/components/KidsExpensesForm";
import EmergencyFundForm from "@/components/EmergencyFundForm";
import { useFormData } from "@/context/FormContext";
import { useRouter } from "next/navigation";
import ProgressIndicator from "@/components/ProgressIndicator";
import Navbar from "@/components/dashboard/Navbar";

export default function BasicDetails() {
  const { formData, handleInputChange, errors, setErrors } = useFormData();
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={formData}
            onChange={handleInputChange}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 2:
        return (
          <HabitsQuestion
            type="disease"
            value={formData.disease}
            onChange={handleInputChange}
            question="Do you have any existing diseases?"
            hint="Say 'Yes' if you have any existing diseases."
          />
        );
      case 3:
        return (
          <HabitsQuestion
            type="smoking"
            value={formData.smoking}
            onChange={handleInputChange}
            question="Do you smoke or chew tobacco?"
            hint="Say 'Yes' if you've smoked in the last year."
          />
        );
      case 4:
        return (
          <HabitsQuestion
            type="alcohol"
            value={formData.alcohol}
            onChange={handleInputChange}
            question="Do you consume alcohol?"
            hint="Say 'Yes' if you've consumed alcohol in the last year."
          />
        );
      case 5:
        return (
          <IncomeForm
            data={formData}
            onChange={handleInputChange}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 6:
        return (
          <IncomeStabilityForm data={formData} onChange={handleInputChange} />
        );
      case 7:
        return (
          <RetirementAgeForm data={formData} onChange={handleInputChange} />
        );
      case 8:
        return <DependentsForm data={formData} onChange={handleInputChange} />;
      case 9:
        return (
          <NomineeReactionForm data={formData} onChange={handleInputChange} />
        );
      case 10:
        return (
          <LivingExpensesForm
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 11:
        return (
          <LoansAdvancesForm
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 12:
        return (
          <SavingsInvestmentsForm
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 13:
        return (
          <InvestmentsForm
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 14:
        return (
          <LifeCoverForm
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 15:
        return (
          <KidsExpensesForm
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 16:
        return (
          <EmergencyFundForm
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.firstName) newErrors.firstName = true;
        if (!formData.lastName) newErrors.lastName = true;
        if (!formData.dateOfBirth) newErrors.dateOfBirth = true;
        if (!formData.pincode) newErrors.pincode = true;
        if (!formData.gender) newErrors.gender = true;
        if (!formData.education) newErrors.education = true;
        break;
      case 2:
        if (!formData.disease) newErrors.disease = true;
        break;
      case 3:
        if (!formData.smoking) newErrors.smoking = true;
        break;
      case 4:
        if (!formData.alcohol) newErrors.alcohol = true;
        break;
      case 5:
        const hasValidIncome = formData.incomeSources.some(
          (source) => source.type && source.amount && source.amount > 0
        );
        if (!hasValidIncome) newErrors.income = true;
        break;
      case 6:
        if (!formData.incomeStability) newErrors.incomeStability = true;
        break;
      case 7:
        if (!formData.retirementAge) newErrors.retirementAge = true;
        break;
      case 8:
        if (formData.hasDependents === null) newErrors.hasDependents = true;
        if (
          formData.hasDependents &&
          (!formData.dependents || formData.dependents.length === 0)
        ) {
          newErrors.dependents = true;
        }
        break;
      case 9:
        if (!formData.nomineeReaction) newErrors.nomineeReaction = true;
        break;
      case 10:
        if (formData.knowsLivingExpenses === null)
          newErrors.knowsLivingExpenses = true;
        if (
          formData.knowsLivingExpenses === true &&
          !formData.monthlyExpenses
        ) {
          newErrors.monthlyExpenses = true;
        }
        break;
      case 11:
        if (formData.hasLoans === null) newErrors.hasLoans = true;
        if (formData.hasLoans === true && !formData.loanAmount) {
          newErrors.loanAmount = true;
        }
        break;
      case 12:
        if (formData.hasSavings === null) newErrors.hasSavings = true;
        if (formData.hasSavings === true && !formData.savingsAmount) {
          newErrors.savingsAmount = true;
        }
        break;
      case 13:
        if (formData.knowsInvestments === null)
          newErrors.knowsInvestments = true;
        if (formData.knowsInvestments === true && !formData.totalInvestments) {
          newErrors.totalInvestments = true;
        }
        break;
      case 14:
        if (formData.hasLifeCover === null) newErrors.hasLifeCover = true;
        if (formData.hasLifeCover === true && !formData.lifeCoverAmount) {
          newErrors.lifeCoverAmount = true;
        }
        break;
      case 15:
        if (
          formData.numberOfKids === null ||
          formData.numberOfKids === undefined
        ) {
          newErrors.numberOfKids = true;
        }
        if (
          formData.educationExpenses === null ||
          formData.educationExpenses === undefined
        ) {
          newErrors.educationExpenses = true;
        }
        if (
          formData.weddingExpenses === null ||
          formData.weddingExpenses === undefined
        ) {
          newErrors.weddingExpenses = true;
        }
        break;
      case 16:
        if (formData.hasEmergencyFund === null)
          newErrors.hasEmergencyFund = true;
        if (formData.hasEmergencyFund === true) {
          if (!formData.emergencyFundAmount)
            newErrors.emergencyFundAmount = true;
          if (!formData.emergencyFundMonths)
            newErrors.emergencyFundMonths = true;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = validateCurrentStep();
    if (isValid) {
      if (currentStep < 16) {
        setCurrentStep((prev) => prev + 1);
      } else {
        router.push("/review");
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getCurrentSection = () => {
    if (currentStep <= 4) return { index: 0, title: "BASIC", totalSteps: 4 };
    if (currentStep <= 7) return { index: 1, title: "INCOME", totalSteps: 3 };
    if (currentStep <= 9)
      return { index: 2, title: "DEPENDANTS", totalSteps: 2 };
    return { index: 3, title: "ASSETS & LIABILITIES", totalSteps: 7 };
  };

  const getRelativeStep = () => {
    const section = getCurrentSection();
    return (
      currentStep -
      (section.index === 0
        ? 0
        : section.index === 1
        ? 4
        : section.index === 2
        ? 7
        : 9)
    );
  };

  const handleRetake = () => {
    // Reset form data
    handleInputChange({ target: { name: "reset", value: true } });
    // Reset errors
    setErrors({});
    // Set current step to 1
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <ProgressBar currentSection={getCurrentSection().index} />

          <ProgressIndicator
            currentStep={getRelativeStep()}
            totalSteps={getCurrentSection().totalSteps}
            title={getCurrentSection().title}
          />

          {renderStep()}

          <div className="flex justify-between items-center mt-4 sm:mt-8">
            {(currentStep > 1 || currentStep === 13) && (
              <button
                type="button"
                onClick={handleRetake}
                className="flex items-center text-gray-500 hover:text-gray-700 mb-4 sm:mb-0 text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Retake the test
              </button>
            )}
          </div>
          <div className="flex justify-between w-full">
            {(currentStep > 1 || currentStep === 16) && (
              <button
                type="button"
                onClick={handlePrevious}
                className="text-gray-500 hover:text-gray-700 mb-4 sm:mb-0"
              >
                ← Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="bg-green-500 text-white px-4 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-green-600 transition-colors ml-auto"
            >
              {currentStep === 16 ? "Review" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
