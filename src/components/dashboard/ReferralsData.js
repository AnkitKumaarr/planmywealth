import { useAuth } from "@/context/AuthContext";
import EmptyState from "./EmptyState";
import { useEffect, useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Loader from "../Loader";

export default function ReferralsData() {
  const { user } = useAuth();
  const [referralsData, setReferralsData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // fetch the referrals data from the database
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/referrals/");
        const data = await response.json();
        if (user && user.role === "manager") {
          setReferralsData(data.data);
        } else if (user && user.role === "admin") {
          setReferralsData(data.data);
        }
        setIsLoading(false);
      } catch (error) {
        setReferralsData([]);
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchReferrals();
  }, [user]);

  const formatToWords = (num) => {
    if (!num || isNaN(num)) return "";
    const value = Number(num);
    if (value < 1000) return `₹ ${value}`;
    if (value < 100000) return `₹ ${(value / 1000).toFixed(1)} thousand`;
    if (value < 10000000) return `₹ ${(value / 100000).toFixed(1)} lakh`;
    return `₹ ${(value / 10000000).toFixed(1)} crore`;
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const routeToGenerateReport = (report) => {
    window.open(`/generatereport?uuid=${report.uuid}`, "_blank");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">
          Your Referrals
        </h1>
        <p className="text-xs md:text-base text-black">
          Keep track of all your referrals.
        </p>
      </div>

      <div className="flex flex-col items-center bg-white min-h-[60vh] rounded-lg shadow p-1 md:p-4 lg:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader size="48px" />
          </div>
        ) : (
          <>
            {referralsData?.length === 0 ||
            referralsData === null ||
            referralsData === undefined ? (
              <EmptyState message="You don't have any referrals yet." />
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="min-w-full table-auto text-[10px] md:text-base">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                        S.No
                      </th>
                      <th className="py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                        Name
                      </th>
                      <th className="hidden md:table-cell py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                        Email
                      </th>
                      {/* <th className="hidden md:table-cell py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                        Age
                      </th> */}
                      <th className="py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                        Life Insurance Need
                      </th>
                      <th className="hidden md:table-cell py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                        Retirement Age
                      </th>
                      {user && user.role === "admin" && (
                        <>
                          <th className="py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                            Referred by
                          </th>
                          <th className="hidden md:table-cell py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                            Referred by Email
                          </th>
                        </>
                      )}
                      <th className="hidden md:table-cell py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                        Created at
                      </th>
                      <th className="py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                        Action
                      </th>
                      <th className="hidden md:table-cell py-0.5 md:py-2 text-center border border-gray-400 text-[10px] md:text-sm">
                        View Report
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralsData?.map((report, index) => (
                      <tr key={report.id}>
                        <td className="border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2 text-[10px] md:text-sm">
                          {index + 1}
                        </td>
                        <td className="border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2 text-[10px] md:text-sm">
                          {report.first_name?.toUpperCase() +
                            " " +
                            report.last_name?.toUpperCase()}
                        </td>
                        <td className="hidden md:table-cell border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2 text-[10px] md:text-sm">
                          {report.userEmail || "N/A"}
                        </td>
                        {/* <td className="hidden md:table-cell border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2 text-[10px] md:text-sm">
                          {report.age}
                        </td> */}
                        <td className="border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2 text-[10px] md:text-sm">
                          {formatToWords(report.lifeInsuranceNeed)}
                        </td>
                        <td className="hidden md:table-cell border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2 text-[10px] md:text-sm">
                          {report.retirement_age}
                        </td>
                        {user && user.role === "admin" && (
                          <>
                            <td className="border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2 text-[10px] md:text-sm">
                              {report.referby_name || "N/A"}
                            </td>
                            <td className="hidden md:table-cell border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2 text-[10px] md:text-sm">
                              {report.referby_email || "N/A"}
                            </td>
                          </>
                        )}
                        <td className="border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2 text-[10px] md:text-sm">
                          {new Date(report.created_at).toLocaleDateString()}
                        </td>
                        <td className="border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2">
                          <button
                            className="bg-blue-500 text-white px-1.5 md:px-4 py-0.5 md:py-2 rounded text-[10px] md:text-sm"
                            onClick={() => handleViewReport(report)}
                          >
                            View
                          </button>
                        </td>
                        <td className="border border-gray-400 text-center px-1 md:px-4 py-0.5 md:py-2">
                          <button
                            onClick={() => routeToGenerateReport(report)}
                            className="hidden md:flex text-green-500 items-center gap-0 mt-4 md:mt-0"
                          >
                            <BsBoxArrowUpRight />
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal with smaller text for mobile */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-2 md:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-2 md:p-4 border-b z-10">
              <div className="flex justify-between items-center flex-row">
                <h3 className="text-sm md:text-xl lg:text-2xl font-semibold text-gray-800">
                  {selectedReport.first_name?.toUpperCase()}{" "}
                  {selectedReport.last_name?.toUpperCase()}
                  <p className="text-[10px] md:text-base">
                    <span className="font-medium">Phone Number:</span>{" "}
                    {selectedReport.phone_number || "N/A"}
                  </p>
                  <p className="text-[10px] md:text-base">
                    <span className="font-medium">Created at:</span>{" "}
                    {new Date(selectedReport.created_at).toLocaleDateString()}
                  </p>
                </h3>

                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-2 md:p-6">
              {user && user.role === "admin" && (
                <div className="mb-6 border-b pb-4">
                  <h4 className="font-semibold text-xs text-blue-600 md:text-lg mb-2">
                    Referral Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Referred by:</span>{" "}
                      {selectedReport.referby_name || "N/A"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Referrer's Email:</span>{" "}
                      {selectedReport.referby_email || "N/A"}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Personal Information Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-green-600 md:text-lg border-b pb-2">
                    Personal Information
                  </h4>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Email:</span>{" "}
                      {selectedReport.userEmail}
                    </p>
                    {/* <p className="text-[10px] md:text-base">
                      <span className="font-medium">Date of Birth:</span>{" "}
                      {new Date(
                        selectedReport.date_of_birth
                      ).toLocaleDateString()}
                    </p> */}
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Age:</span>{" "}
                      {selectedReport.age}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Gender:</span>{" "}
                      {selectedReport.gender}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Education:</span>{" "}
                      {selectedReport.education}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Pincode:</span>{" "}
                      {selectedReport.pincode}
                    </p>
                  </div>
                </div>

                {/* Health Information Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-green-600 md:text-lg border-b pb-2">
                    Health Information
                  </h4>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Pre-existing Disease:</span>{" "}
                      {selectedReport.disease
                        ? selectedReport?.user_disease
                        : "No"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Smoking Habit:</span>{" "}
                      {selectedReport.smoking ? "Yes" : "No"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Alcohol Consumption:</span>{" "}
                      {selectedReport.alcohol ? "Yes" : "No"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Has Health Insurance:</span>{" "}
                      {selectedReport.health_insurance_amount ? "Yes" : "No"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Current Health Cover:</span>{" "}
                      {formatToWords(selectedReport?.health_insurance_amount)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">
                        Health Insurance Need:
                      </span>{" "}
                      {formatToWords(selectedReport?.healthInsuranceNeed)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">
                        Additional Cover Needed:
                      </span>{" "}
                      {formatToWords(
                        selectedReport?.additionalHealthCoverNeeded
                      )}
                    </p>
                  </div>
                </div>

                {/* Financial Overview Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-green-600 md:text-lg border-b pb-2">
                    Financial Overview
                  </h4>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Income Sources:</span>{" "}
                      {selectedReport?.income_sources
                        ? typeof selectedReport.income_sources === "string"
                          ? JSON.parse(selectedReport.income_sources).map(
                              (income, index, arr) => (
                                <span key={income.type}>
                                  {`${income.type}: ${formatToWords(
                                    income.amount
                                  )}`}
                                  {index !== arr.length - 1 ? ", " : ""}
                                </span>
                              )
                            )
                          : selectedReport.income_sources.map(
                              (income, index, arr) => (
                                <span key={income.type}>
                                  {`${income.type}: ${formatToWords(
                                    income.amount
                                  )}`}
                                  {index !== arr.length - 1 ? ", " : ""}
                                </span>
                              )
                            )
                        : "N/A"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Total Income:</span>{" "}
                      {formatToWords(
                        selectedReport.total_income /
                          (selectedReport.retirement_age - selectedReport.age)
                      )}{" "}
                      per annum
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Income Stability:</span>{" "}
                      {selectedReport.income_stability}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Retirement Age:</span>{" "}
                      {selectedReport.retirement_age}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Expenses:</span>{" "}
                      {selectedReport?.expenses
                        ? typeof selectedReport.expenses === "string"
                          ? JSON.parse(selectedReport.expenses).map(
                              (expense, index, arr) => (
                                <span key={expense.category}>
                                  {`${expense.category
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^\w/, (c) =>
                                      c.toUpperCase()
                                    )}: ${formatToWords(expense.value)}`}
                                  {index !== arr.length - 1 ? ", " : ""}
                                </span>
                              )
                            )
                          : selectedReport.expenses.map(
                              (expense, index, arr) => (
                                <span key={expense.category}>
                                  {`${expense.category
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^\w/, (c) =>
                                      c.toUpperCase()
                                    )}: ${formatToWords(expense.value)}`}
                                  {index !== arr.length - 1 ? ", " : ""}
                                </span>
                              )
                            )
                        : "N/A"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">
                        Total Monthly Expenses:
                      </span>{" "}
                      {formatToWords(selectedReport.total_monthly_expenses)}
                    </p>
                  </div>
                </div>

                {/* Dependents Information Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-green-600 md:text-lg border-b pb-2">
                    Dependents Information
                  </h4>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Has Dependents:</span>{" "}
                      {selectedReport.hasDependents ? "Yes" : "No"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Number of Dependents:</span>{" "}
                      {selectedReport.dependents}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Dependents:</span>{" "}
                      {selectedReport?.dependents_name
                        ? typeof selectedReport.dependents_name === "string"
                          ? JSON.parse(selectedReport.dependents_name).map(
                              (dependent) => (
                                <span key={dependent.value}>
                                  {dependent.label}
                                  {", "}
                                </span>
                              )
                            )
                          : selectedReport.dependents_name.map((dependent) => (
                              <span key={dependent.value}>
                                {dependent.label}
                              </span>
                            ))
                        : "N/A"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Number of Kids:</span>{" "}
                      {selectedReport.number_of_kids}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Education Expenses:</span>{" "}
                      {formatToWords(selectedReport.education_expenses)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Education Inflation:</span>{" "}
                      {formatToWords(selectedReport.education_inflation)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Wedding Expenses:</span>{" "}
                      {formatToWords(selectedReport.wedding_expenses)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Wedding Inflation:</span>{" "}
                      {formatToWords(selectedReport.wedding_inflation)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Dependents:</span>{" "}
                      {selectedReport?.children
                        ? typeof selectedReport.children === "string"
                          ? JSON.parse(selectedReport.children).map((child, index) => (
                              <span key={index}>
                                Child {index + 1}: {" "}
                                {`Current Age: ${child.currentAge}, `}
                                {`Education at ${child.educationAge} (₹${child.educationExpenses}), `}
                                {`Wedding at ${child.weddingAge} (₹${child.weddingExpenses})`}
                                {index < JSON.parse(selectedReport.children).length - 1 ? "; " : ""}
                              </span>
                            ))
                          : selectedReport.children.map((child, index) => (
                              <span key={index}>
                                Child {index + 1}: {" "}
                                {`Current Age: ${child.currentAge}, `}
                                {`Education at ${child.educationAge} (₹${child.educationExpenses}), `}
                                {`Wedding at ${child.weddingAge} (₹${child.weddingExpenses})`}
                                {index < selectedReport.children.length - 1 ? "; " : ""}
                              </span>
                            ))
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Savings & Investments Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-green-600 md:text-lg border-b pb-2">
                    Savings & Investments
                  </h4>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Has Savings:</span>{" "}
                      {selectedReport.hasSavings ? "Yes" : "No"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Savings Amount:</span>{" "}
                      {formatToWords(selectedReport.savings_amount)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Investments:</span>{" "}
                      {selectedReport?.splitted_investments
                        ? typeof selectedReport.splitted_investments ===
                          "string"
                          ? JSON.parse(selectedReport.splitted_investments).map(
                              (investment, index, arr) => (
                                <span key={investment.id}>
                                  {`${investment.type.toUpperCase()}: ${formatToWords(
                                    investment.amount
                                  )}`}
                                  {index !== arr.length - 1 ? ", " : ""}
                                </span>
                              )
                            )
                          : selectedReport.splitted_investments.map(
                              (investment, index, arr) => (
                                <span key={investment.id}>
                                  {`${investment.type.toUpperCase()}: ${formatToWords(
                                    investment.amount
                                  )}`}
                                  {index !== arr.length - 1 ? ", " : ""}
                                </span>
                              )
                            )
                        : "N/A"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Total Investments:</span>{" "}
                      {formatToWords(selectedReport.total_investments)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Emergency Fund:</span>{" "}
                      {selectedReport.hasEmergencyFund ? "Yes" : "No"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">
                        Emergency Fund Amount:
                      </span>{" "}
                      {formatToWords(selectedReport.emergency_fund_amount)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">
                        Emergency Fund Duration:
                      </span>{" "}
                      {selectedReport.emergency_fund_months} months
                    </p>
                  </div>
                </div>

                {/* Insurance Details Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-green-600 md:text-lg border-b pb-2">
                    Insurance Details
                  </h4>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Has Life Cover:</span>{" "}
                      {selectedReport.hasLifeCover ? "Yes" : "No"}
                    </p>
                    {(selectedReport.hasLifeCover === true ||
                      selectedReport.hasLifeCover === "yes") && (
                      <p className="text-[10px] md:text-base">
                        <span className="font-medium">Term Insurance:</span>{" "}
                        {formatToWords(selectedReport.termInsuranceAmount)}
                      </p>
                    )}
                    {(selectedReport.hasLifeCover === true ||
                      selectedReport.hasLifeCover === "yes") && (
                      <p className="text-[10px] md:text-base">
                        <span className="font-medium">Health Insurance:</span>{" "}
                        {formatToWords(selectedReport.healthInsuranceAmount)}
                      </p>
                    )}

                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Current Life Cover:</span>{" "}
                      {formatToWords(selectedReport.life_cover_amount)}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Life Insurance Need:</span>{" "}
                      {formatToWords(selectedReport.lifeInsuranceNeed)}
                    </p>
                    {/* <p className="text-[10px] md:text-base">
                      <span className="font-medium">
                        Additional Cover Needed:
                      </span>{" "}
                      {formatToWords(selectedReport.additionalCoverNeeded)}
                    </p> */}
                  </div>
                </div>

                {/* Loans & Major Expenses Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-green-600 md:text-lg border-b pb-2">
                    Loans & Major Expenses
                  </h4>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">
                        Have you taken any large loans or advances:
                      </span>{" "}
                      {selectedReport.hasLoans ? "Yes" : "No"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Loans:</span>{" "}
                      {selectedReport?.loans
                        ? typeof selectedReport.loans === "string"
                          ? Object.entries(
                              JSON.parse(selectedReport.loans)
                            ).map(([type, amount], index, arr) => (
                              <span key={type}>
                                {`${type
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^\w/, (c) =>
                                    c.toUpperCase()
                                  )}: ${formatToWords(amount)}`}
                                {index !== arr.length - 1 ? ", " : ""}
                              </span>
                            ))
                          : Object.entries(selectedReport.loans).map(
                              ([type, amount], index, arr) => (
                                <span key={type}>
                                  {`${type
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^\w/, (c) =>
                                      c.toUpperCase()
                                    )}: ${formatToWords(amount)}`}
                                  {index !== arr.length - 1 ? ", " : ""}
                                </span>
                              )
                            )
                        : "N/A"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">
                        Have any major upcoming expenses:
                      </span>{" "}
                      {selectedReport.major_expenses ? "Yes" : "No"}
                    </p>
                    <p className="text-[10px] md:text-base">
                      <span className="font-medium">Major Expenses:</span>{" "}
                      {selectedReport?.major_expenses
                        ? typeof selectedReport.major_expenses === "string"
                          ? JSON.parse(selectedReport.major_expenses).map(
                              (expense, index, arr) => (
                                <span key={expense.id}>
                                  {`${expense.description}: ${formatToWords(
                                    expense.amount
                                  )}`}
                                  {index !== arr.length - 1 ? ", " : ""}
                                </span>
                              )
                            )
                          : selectedReport.major_expenses.map(
                              (expense, index, arr) => (
                                <span key={expense.id}>
                                  {`${expense.description}: ${formatToWords(
                                    expense.amount
                                  )}`}
                                  {index !== arr.length - 1 ? ", " : ""}
                                </span>
                              )
                            )
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
