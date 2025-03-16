import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function AccountContent() {
  const { user } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/referral/${user?.user_referral_code}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 10000); // Reset after 2 seconds
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold">Account Details</h1>

      <div className="bg-white rounded-lg shadow p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-4xl md:text-6xl text-white">
              {user?.name?.charAt(0).toUpperCase() || "X"}
            </span>
          </div>

          <div className="space-y-4 md:space-y-6 flex-1 w-full">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <div className="text-base md:text-lg">
                {user?.name || "Loading..."}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Mobile No.
              </label>
              <div className="text-base md:text-lg">
                {user?.mobile || "----"}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <div className="text-base md:text-lg">
                {user?.email || "Loading..."}
              </div>
            </div>
            {user?.role === "manager" ||
              (user?.role === "admin" && (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Your Referral Code
                  </label>
                  <div className="text-base md:text-lg flex items-center gap-2">
                    {user?.user_referral_code || "Loading..."}
                    <button
                      onClick={handleCopy}
                      className="rounded hover:bg-gray-100 p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
