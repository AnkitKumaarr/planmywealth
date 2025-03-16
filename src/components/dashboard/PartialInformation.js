"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import EmptyState from "./EmptyState";

// Individual partial information item component
const PartialInfoItem = ({ item, index }) => (
  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.name || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.phone_number || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.pincode || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.gender || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.education || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {new Date(item.created_at).toLocaleDateString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.referral_email || "N/A"}
    </td>
  </tr>
);

export default function PartialInformation() {
  const [partialData, setPartialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin, if not redirect to dashboard
    if (user && user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    const fetchPartialData = async () => {
      try {
        const response = await fetch("/api/partial-information", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch partial information data");
        }

        const data = await response.json();
        setPartialData(data.data || []);
      } catch (err) {
        console.error("Error fetching partial information:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchPartialData();
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="text-center py-10">Please log in to access this page</div>
    );
  }

  if (user.role !== "admin" && user.role !== "manager") {
    return (
      <div className="text-center py-10">
        You don't have permission to access this page
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-full overflow-x-auto">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-xl md:text-2xl font-bold mb-2">
          Partial Information
        </h1>
        <p className="text-black text-sm md:text-base">
          View all partial form submissions from users who didn't complete the
          full process.
        </p>
      </div>

      <div className="flex flex-col items-center h-[60vh] bg-white rounded-lg shadow p-4 md:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader size="48px" />
          </div>
        ) : (
          <>
            {error ? (
              <div className="text-center text-red-500 py-10">
                Error: {error}
              </div>
            ) : partialData?.length === 0 ||
              partialData === null ||
              partialData === undefined ? (
              <EmptyState message="No partial information submissions found." />
            ) : (
              <div className="w-full overflow-y-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pincode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Education
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Referral By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {partialData.map((item, index) => (
                      <PartialInfoItem key={index} item={item} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
