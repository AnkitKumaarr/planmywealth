import { useAuth } from "@/context/AuthContext";

export default function ReferContent() {
  const { user } = useAuth();
  const url = `${(process.env.NEXT_PUBLIC_APP_URL).substring(7)}/referral/${user?.user_referral_code}`;
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">Refer</h1>
        <div className="text-base md:text-xl bg-green-50 px-3 md:px-4 py-2 rounded-lg flex items-center">
          <span className="mr-2"> 🤵 Your Referrals</span>
          <span className="font-bold">0</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 md:p-8 text-center">
        <div className="max-w-md mx-auto">
          <img
            src="/Images/referImage.png"
            alt="Refer and Earn"
            className="w-32 h-32 md:w-48 md:h-48 mx-auto"
          />
          <h2 className="text-xl md:text-2xl font-bold mb-2">Refer your colleagues</h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Share your referral link with your colleagues.
          </p>

          <div className="flex flex-col sm:flex-row items-center border border-green-500 gap-2 p-2 bg-gray-50 rounded-lg mb-20">
            <input
              type="text"
              value={url || "https://planmywealth.com/referral/L56wsa"}
              className="w-full flex-1 bg-transparent outline-none text-sm md:text-base px-2"
              readOnly
            />
            <button
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={() => navigator.clipboard.writeText(url)}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
