import { useAuth } from "@/context/AuthContext";
import EmptyState from "./EmptyState";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import ReportItem from "./ReportItem";

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
