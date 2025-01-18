import { useAuth } from "@/context/AuthContext";

export default function ReferContent() {
  const { user } = useAuth();
  const url = `${(process.env.NEXT_PUBLIC_APP_URL).substring(7)}/referral/${user?.user_referral_code}`;
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Refer</h1>
        <div className="text-xl bg-green-50 px-4 py-2 rounded-lg flex items-center">
          <span className="mr-2"> 🤵 Your Referrals</span>
          <span className="font-bold">0</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="max-w-md mx-auto">
          <img
            src="/Images/referImage.png"
            alt="Refer and Earn"
            className="w-48 h-48 mx-auto "
          />
          <h2 className="text-2xl font-bold mb-2">Refer your colleagues</h2>
          <p className="text-gray-600 mb-6">
            Share your referral link with your colleagues.
          </p>

          <div className="flex items-center border border-green-500 gap-2 p-2 bg-gray-50 rounded-lg mb-20">
            <input
              type="text"
              value={url || "https://planmywealth.com/referral/L56wsa"}
              className="flex-1 bg-transparent outline-none"
              readOnly
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
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
