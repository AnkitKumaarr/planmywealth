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
    <div className="space-y-4">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-2xl font-bold mb-2">Reports</h1>
        <p className="text-black">
          Keep track of all your term & health insurance policies.
        </p>
      </div>
      <div className="flex flex-col items-center  h-[60vh] bg-white rounded-lg shadow p-8">
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
              reportsData.map((report) => (

                <ReportItem key={report.uuid} report={report} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ReportItem({ report }) {
  const router = useRouter();
  // instead of router push, open in a new tab
  const routeToGenerateReport = () => {
    window.open(`/generatereport?uuid=${report.uuid}`, "_blank");
  };
  return (
    <div className="flex w-full justify-between items-center bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center">
        <div className="mr-6 text-4xl">📈</div>
        <div>
          <div className="flex flex-row space-x-16 justify-start items-start">
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm">Insurance Type</p>
              <p className="font-bold text-md">Term Insurance</p>
            </div>
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm">Members</p>
              <p className="font-bold text-md">{report.name}</p>
            </div>
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm">Cover Type</p>
              <p className="font-bold text-md">Individual</p>
            </div>
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm">Min Coverage</p>
              <p className="font-bold text-md">
                {report.additionalCoverNeeded}
              </p>
            </div>
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm">Retirement Age</p>
              <h4 className="font-bold text-md">{report.retirementAge}</h4>
            </div>
          </div>
        </div>
      </div>
      <button onClick={routeToGenerateReport} className="text-green-500 flex items-center gap-2">
        <BsBoxArrowUpRight />
        View Report
      </button>
    </div>
  );
}
