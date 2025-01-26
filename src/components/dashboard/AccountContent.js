import { useAuth } from "@/context/AuthContext";

export default function AccountContent() {
  const { user } = useAuth();
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
              <div className="text-base md:text-lg">{user?.name || "Loading..."}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Mobile No.
              </label>
              <div className="text-base md:text-lg">{user?.mobile || "----"}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <div className="text-base md:text-lg">{user?.email || "Loading..."}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
