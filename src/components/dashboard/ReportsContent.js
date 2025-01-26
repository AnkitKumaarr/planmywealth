import { useAuth } from "@/context/AuthContext";
import EmptyState from "./EmptyState";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function ReportsContent() {
  const { user } = useAuth();
  const [reportsData, setReportsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUserReports = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        const response = await fetch("/api/reports/user-reports");
        const data = await response.json();
        console.log("data", data);
        setReportsData(data.data || []);
        setIsLoading(false);
      } catch (error) {
        setReportsData([]);
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchCurrentUserReports();
  }, [user]);

  return (
    <div className="space-y-4 max-w-full overflow-x-auto">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Reports</h1>
        <p className="text-black text-sm md:text-base">
          Keep track of all your term & health insurance policies.
        </p>
      </div>
      <div className="flex flex-col items-center h-[60vh] bg-white rounded-lg shadow p-4 md:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader size="48px" />
          </div>
        ) : (
          <>
            {reportsData?.length === 0 ||
            reportsData === null ||
            reportsData === undefined ? (
              <EmptyState message="You don't have any reports yet." />
            ) : (
              <div className="w-full overflow-x-auto">
                {reportsData.map((report) => (
                  <ReportItem key={report.uuid} report={report} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ReportItem({ report }) {
  const router = useRouter();

  const routeToGenerateReport = () => {
    window.open(`/generatereport?uuid=${report.uuid}`, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-4 md:gap-6">
        <div className="text-4xl hidden md:block">📈</div>
        <div className="w-full">
          {/* Mobile view */}
          <div className="flex justify-between items-center md:hidden">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📈</div>
              <div className="flex flex-col">
                <p className="text-sm">Min Coverage</p>
                <p className="font-bold text-md">
                  {report.additionalCoverNeeded}
                </p>
              </div>
            </div>
            <button
              onClick={routeToGenerateReport}
              className="text-green-500 flex items-center gap-2"
            >
              <BsBoxArrowUpRight />
              View Report
            </button>
          </div>

          {/* Desktop view */}
          <div className="hidden md:grid grid-cols-5 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Insurance Type</p>
              <p className="font-bold text-md">Term Insurance</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Members</p>
              <p className="font-bold text-md">{report.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Cover Type</p>
              <p className="font-bold text-md">Individual</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Min Coverage</p>
              <p className="font-bold text-md">
                {report.additionalCoverNeeded}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Retirement Age</p>
              <h4 className="font-bold text-md">{report.retirementAge}</h4>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop button - hidden on mobile */}
      <button
        onClick={routeToGenerateReport}
        className="hidden md:flex text-green-500 items-center gap-2 mt-4 md:mt-0"
      >
        <BsBoxArrowUpRight />
        View Report
      </button>
    </div>
  );
}
