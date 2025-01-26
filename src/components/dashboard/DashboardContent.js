"use client";
import { useAuth } from "@/context/AuthContext";
import InsuranceForm from "../InsuranceForm";

export default function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 px-2">
        👋 Hi {user && user?.name + ","}
      </h2>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8">
          <InsuranceForm />
        </div>
      </div>
    </div>
  );
}
