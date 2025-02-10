"use client";
import { useAuth } from "@/context/AuthContext";
import InsuranceForm from "../InsuranceForm";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import ReportItem from "./ReportItem";
import AdvisorProfileSection from "@/app/generatereport/AdvisorProfileSection";

export default function DashboardContent() {
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
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 px-2">
        👋 Hi {user && user?.name + ","}
      </h2>

      {/* <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8">
          <InsuranceForm />
        </div>
      </div> */}
      <div className="flex flex-col items-center h-[60vh] bg-white rounded-lg shadow p-4 md:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader size="48px" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 min-h-[40vh]">
            <div className="">
              <div className="flex items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    Hurray! Your term report is ready
                  </h2>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                {reportsData && (
                  <ReportItem key={reportsData} report={reportsData[0]} />
                )}
              </div>
            </div>

            <AdvisorProfileSection />
          </div>
        )}
      </div>
    </div>
  );
}
