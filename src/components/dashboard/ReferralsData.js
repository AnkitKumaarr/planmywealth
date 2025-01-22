import { useAuth } from "@/context/AuthContext";
import EmptyState from "./EmptyState";
import { useEffect, useState } from "react";
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
        console.log("data", data);
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  console.log("referralsData", referralsData);
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-2xl font-bold mb-2">Your Referrals</h1>
        <p className="text-black">Keep track of all your referrals.</p>
      </div>

      <div className="flex flex-col items-center  h-[60vh] bg-white rounded-lg shadow p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader size="48px" />
          </div>
        ) : (
          <>
            {referralsData?.length === 0 ||
            referralsData === null ||
            referralsData === undefined ? (
              <EmptyState message="You don't have any referrals yet." />
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 text-center border border-gray-400">
                      S.No
                    </th>
                    <th className="py-2 text-center border border-gray-400">
                      Name
                    </th>
                    <th className="py-2 text-center border border-gray-400">
                      Email
                    </th>
                    <th className="py-2 text-center border border-gray-400">
                      Age
                    </th>
                    <th className="py-2 text-center border border-gray-400">
                      Life Insurance Need
                    </th>
                    <th className="py-2 text-center border border-gray-400">
                      Retirement Age
                    </th>
                    {user && user.role === "admin" && (
                      <>
                        <th className="py-2 text-center border border-gray-400">
                          Referred by
                        </th>
                        <th className="py-2 text-center border border-gray-400">
                          Referred by Email
                        </th>
                      </>
                    )}
                    <th className="py-2 text-center border border-gray-400">
                      Action
                    </th>
                    {/* Add more headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {referralsData?.map((report, index) => (
                    <tr key={report.id} className="">
                      <td className="border border-gray-400 text-center px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-400 text-center px-4 py-2">
                        {report.first_name?.toUpperCase() +
                          " " +
                          report.last_name?.toUpperCase()}
                      </td>
                      <td className="border border-gray-400 text-center px-4 py-2">
                        {report.userEmail || "N/A"}
                      </td>

                      <td className="border border-gray-400 text-center px-4 py-2">
                        {report.age}
                      </td>
                      <td className="border border-gray-400 text-center px-4 py-2">
                        {formatToWords(report.lifeInsuranceNeed)}
                      </td>
                      <td className="border border-gray-400 text-center px-4 py-2">
                        {report.retirement_age}
                      </td>
                      {user && user.role === "admin" && (
                        <>
                          <td className="border border-gray-400 text-center px-4 py-2">
                            {report.referby_name || "N/A"}
                          </td>
                          <td className="border border-gray-400 text-center px-4 py-2">
                            {report.referby_email || "N/A"}
                          </td>
                        </>
                      )}
                      <td className="border border-gray-400 text-center px-4 py-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          onClick={() => handleViewReport(report)}
                        >
                          View Full Report
                        </button>
                      </td>
                      {/* Add more data cells as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      {/* Modal */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg  mx-4 p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {selectedReport.first_name.toUpperCase()}{" "}
                {selectedReport.last_name.toUpperCase()}
              </h3>
              {user && user.role === "admin" && (
                <>
                  <p>
                    Referred by:{" "}
                    <span className="font-bold">
                      {selectedReport.referby_name || "N/A"}
                    </span>
                  </p>
                  <p>
                    Referred person email:{" "}
                    <span className="font-bold">
                      {selectedReport.referby_email || "N/A"}
                    </span>
                  </p>
                </>
              )}
              <div className="grid grid-cols-4 gap-4 space-y-2 text-left">
                <p>
                  <strong>Email:</strong> {selectedReport.userEmail}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(selectedReport.date_of_birth).toLocaleDateString()}
                </p>
                <p>
                  <strong>Age:</strong> {selectedReport.age}
                </p>
                <p>
                  <strong>Pincode:</strong> {selectedReport.pincode}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedReport.gender}
                </p>
                <p>
                  <strong>Education:</strong> {selectedReport.education}
                </p>
                <p>
                  <strong>Disease:</strong>{" "}
                  {selectedReport.disease ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Smoking:</strong>{" "}
                  {selectedReport.smoking ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Alcohol:</strong>{" "}
                  {selectedReport.alcohol ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Total Income:</strong>{" "}
                  {formatToWords(selectedReport.total_income)}
                </p>
                <p>
                  <strong>Income Stability:</strong>{" "}
                  {selectedReport.income_stability}
                </p>
                <p>
                  <strong>Retirement Age:</strong>{" "}
                  {selectedReport.retirement_age}
                </p>
                <p>
                  <strong>Has Dependents:</strong>{" "}
                  {selectedReport.hasDependents ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Dependents:</strong> {selectedReport.dependents}
                </p>
                <p>
                  <strong>Nominee Reaction:</strong>{" "}
                  {selectedReport.nomineeReaction}
                </p>
                <p>
                  <strong>Knows Living Expenses:</strong>{" "}
                  {selectedReport.knowsLivingExpenses ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Monthly Expenses:</strong>{" "}
                  {formatToWords(selectedReport.monthly_expenses)}
                </p>
                <p>
                  <strong>Has Loans:</strong>{" "}
                  {selectedReport.hasLoans ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Loan Amount:</strong>{" "}
                  {formatToWords(selectedReport.loan_amount)}
                </p>
                <p>
                  <strong>Has Savings:</strong>{" "}
                  {selectedReport.hasSavings ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Savings Amount:</strong>{" "}
                  {formatToWords(selectedReport.savings_amount)}
                </p>
                <p>
                  <strong>Knows Investments:</strong>{" "}
                  {selectedReport.knowsInvestments ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Total Investments:</strong>{" "}
                  {formatToWords(selectedReport.total_investments)}
                </p>
                <p>
                  <strong>Has Life Cover:</strong>{" "}
                  {selectedReport.hasLifeCover ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Life Cover Amount:</strong>{" "}
                  {formatToWords(selectedReport.life_cover_amount)}
                </p>
                <p>
                  <strong>Number of Kids:</strong>{" "}
                  {selectedReport.number_of_kids}
                </p>
                <p>
                  <strong>Education Expenses:</strong>{" "}
                  {formatToWords(selectedReport.education_expenses)}
                </p>
                <p>
                  <strong>Wedding Expenses:</strong>{" "}
                  {formatToWords(selectedReport.wedding_expenses)}
                </p>
                <p>
                  <strong>Has Emergency Fund:</strong>{" "}
                  {selectedReport.hasEmergencyFund ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Emergency Fund Amount:</strong>{" "}
                  {formatToWords(selectedReport.emergency_fund_amount)}
                </p>
                <p>
                  <strong>Emergency Fund Months:</strong>{" "}
                  {selectedReport.emergency_fund_months}
                </p>
                <p>
                  <strong>Life Insurance Need:</strong>{" "}
                  {formatToWords(selectedReport.lifeInsuranceNeed)}
                </p>
                <p>
                  <strong>Additional Cover Needed:</strong>{" "}
                  {formatToWords(selectedReport.additionalCoverNeeded)}
                </p>
              </div>
              <div className="mt-6">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
