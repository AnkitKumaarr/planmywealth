"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import ReportsContent from "@/components/dashboard/ReportsContent";
import DocumentsContent from "@/components/dashboard/DocumentsContent";
import QuotationsContent from "@/components/dashboard/QuotationsContent";
import ReferContent from "@/components/dashboard/ReferContent";
import AccountContent from "@/components/dashboard/AccountContent";
import ReferralsData from "@/components/dashboard/ReferralsData";
import PartialInformation from "@/components/dashboard/PartialInformation";
import { useFormData } from "@/context/FormContext";

export default function Dashboard() {
  const { sidebarOpen, setSidebarOpen } = useFormData();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const path = localStorage.getItem("pmwcurrentPath");
    setCurrentPath(path);

    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);
  const CustomContent = () => {
    switch (currentPath) {
      case "dashboard":
        return <DashboardContent />;
      case "reports":
        return <ReportsContent />;
      case "documents":
        return <DocumentsContent />;
      case "quotations":
        return <QuotationsContent />;
      case "refer":
        return <ReferContent />;
      case "account":
        return <AccountContent />;
      case "your-referrals":
        return <ReferralsData />;
      case "partial-information":
        return <PartialInformation />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> 
      <div className="flex pt-16">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          pathname={currentPath}
          handlePathChange={setCurrentPath}
        />

        <main
          className={`flex-1 transition-all duration-300 ease-in-out
            min-h-[calc(100vh-64px)] w-full
            ${sidebarOpen ? "" : "ml-0"}
            p-4 lg:p-8`}
        >
          <CustomContent />
        </main>
      </div>
    </div>
  );
}
