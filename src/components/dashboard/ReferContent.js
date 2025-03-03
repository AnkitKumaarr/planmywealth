import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ReferContent() {
  const { user } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/referral/${user?.user_referral_code}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 10000); // Reset after 2 seconds
  };

  return (
    <div className="space-y-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl lg:text-1xl font-semibold">Refer</h1>
        {/* <div className="text-base md:text-lg lg:text-xl bg-green-50 px-3 md:px-4 py-2 rounded-lg flex items-center w-full sm:w-auto">
          <span className="mr-2"> 🤵 Your Referrals</span>
          <span className="font-bold">0</span>
        </div> */}
      </div>

      <div className="bg-white rounded-lg shadow p-4 md:p-6 lg:p-8 text-center">
        <div className="max-w-lg mx-auto">
          <img
            src="/Images/referImage.png"
            alt="Refer and Earn"
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto object-contain"
          />
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold my-4">
            Refer your colleagues
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6">
            Share your referral link with your colleagues.
          </p>

          <div className="flex flex-col sm:flex-row items-center border border-green-500 gap-3 p-3 bg-gray-50 rounded-lg mb-8 sm:mb-12 lg:mb-16">
            <input
              type="text"
              value={url || "https://planmywealth.com/referral/L56wsa"}
              className="w-full flex-1 bg-transparent outline-none text-sm md:text-base px-2 py-2"
              readOnly
            />
            <button
              className="w-full sm:w-auto bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
