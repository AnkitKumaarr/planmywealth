"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { usePathname } from "next/navigation";
import ReportsContent from "@/components/dashboard/ReportsContent";
import DocumentsContent from "@/components/dashboard/DocumentsContent";
import QuotationsContent from "@/components/dashboard/QuotationsContent";
import ReferContent from "@/components/dashboard/ReferContent";
import AccountContent from "@/components/dashboard/AccountContent";
import ReferralsData from "@/components/dashboard/ReferralsData";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const path = localStorage.getItem("pmwcurrentPath");
    setCurrentPath(path);
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
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          pathname={currentPath}
          handlePathChange={setCurrentPath}
        />
        <main
          className={`flex-1 p-8 ${
            sidebarOpen ? "ml-64" : "ml-0"
          } transition-all duration-300`}
        >
          <CustomContent />
        </main>
      </div>
    </div>
  );
}
