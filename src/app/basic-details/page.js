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
import Review from "@/components/Review";
import RetakeButton from "@/components/RetakeButton";

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
            handleSalaryWarning={handleSalaryWarning}
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
      case 17:
        return (
          <ReviewForm
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
        // show error if the total income is not greater than 2 lakhs
        if (
          formData.incomeSources.reduce(
            (sum, source) => sum + source.amount,
            0
          ) < 200000
        ) {
          newErrors.SalaryWarning = true;
        }
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
      if (currentStep < 17) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleSalaryWarning = () => {
    setErrors({ ...errors, SalaryWarning: false });
    setCurrentStep((prev) => prev + 1);
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

  const sections = [
    { id: "basic", label: "1. BASIC" },
    { id: "income", label: "2. INCOME" },
    { id: "dependants", label: "3. DEPENDANTS" },
    { id: "assets", label: "4. ASSETS & LIABILITIES" },
  ];

  return (
    <div className="min-h-screen bg-white md:bg-gray-200">
      <div className="hidden md:flex md:flex-col">
        <Navbar />
      </div>
      <div className=" mt-0 md:mt-16 p-0 md:p-4 mb-16 md:mb-0">
        {currentStep === 17 ? (
          <>
            {" "}
            <Review
              onBackStep={handlePrevious}
              setCurrentStep={setCurrentStep}
            />{" "}
          </>
        ) : (
          <>
            <div className="max-w-3xl  mx-auto md:px-4">
              <ProgressBar
                currentSection={getCurrentSection().index}
                sections={sections}
                handleRetake={handleRetake}
                currentStep={currentStep}
              />
            </div>
            <div className="max-w-3xl mx-auto   sm:px-6 lg:px-8">
              <div className=" hidden md:block h-1 md:h-2 bg-gray-300 rounded-md">
                <div
                  className="h-1 md:h-2 bg-green-500 rounded-md transition-all duration-300"
                  style={{
                    width: `${
                      getCurrentSection().index === 0
                        ? "10%"
                        : `${
                            (getCurrentSection().index / sections?.length) * 100
                          }%`
                    }`,
                  }}
                />
              </div>
              <div className="bg-white rounded-md md:shadow-lg p-4 sm:p-6 lg:p-8">
                <ProgressIndicator
                  currentStep={getRelativeStep()}
                  totalSteps={getCurrentSection().totalSteps}
                  title={getCurrentSection().title}
                />
                {renderStep()}
                <div className="hidden md:block">
                  <RetakeButton
                    handleRetake={handleRetake}
                    currentStep={currentStep}
                  />
                </div>
              </div>
              <div className="flex py-4 mt-2 items-center justify-center gap-16 px-4 w-full fixed bottom-0 left-0 right-0 sm:relative bg-white sm:bg-transparent sm:p-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:shadow-none">
                {(currentStep > 1 || currentStep === 16) && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="text-gray-500 hover:text-gray-700  sm:mb-0 "
                  >
                    ←Previous
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-green-500 text-white ml-center px-16 py-3 sm:px-8 sm:py-3 rounded-md hover:bg-green-600 transition-colors order-1 sm:order-2 sm:ml-auto  sm:mb-0"
                >
                  {currentStep === 16 ? "Review" : "Next→"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
