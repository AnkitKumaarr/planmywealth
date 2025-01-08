"use client";
import { useAuth } from "@/context/AuthContext";
import InsuranceForm from "../InsuranceForm";

export default function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-2">
        👋 Hi {user && user?.name + ","}
      </h2>
      {/* Welcome Section */}
      {/* <div className="bg-white p-8 rounded-lg shadow-sm mb-6">
        <p className="text-gray-600">
          Get a personalized insurance report in 3 min
        </p>
        <div className="mt-6">
          <p className="text-gray-700 mb-4">
            Term insurance is a comprehensive plan that covers expenses related
            to hospitalization resulting from illnesses, accidents, or injuries.
            It provides protection against unforeseen medical expenditures
          </p>

          <div className="flex gap-4 mb-6">
            <button className="flex items-center px-6 py-3 rounded-md border hover:bg-gray-50">
              <span className="mr-2">❤️</span>
              Health
            </button>
            <button className="flex items-center px-6 py-3 rounded-md border bg-green-50 text-green-600 border-green-200">
              <span className="mr-2">🌳</span>
              Term
            </button>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Select your gender</h3>
            <div className="flex gap-4 mb-6">
              <button className="flex-1 bg-white px-6 py-3 rounded-md border hover:border-green-500">
                👨 Male
              </button>
              <button className="flex-1 bg-white px-6 py-3 rounded-md border hover:border-green-500">
                👩 Female
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-4">What's your Age?</h3>
              <select className="w-full p-3 rounded-md border bg-white">
                <option>Select Age</option>
                {[...Array(73)].map((_, i) => (
                  <option key={i + 18} value={i + 18}>
                    {i + 18} years
                  </option>
                ))}
              </select>
            </div>

            <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600">
              Get Started
            </button>
          </div>
        </div>
      </div> */}
      <div className="bg-white p-8 rounded-lg shadow-sm mb-6">
        <InsuranceForm />
      </div>
    </div>
  );
}
