import { useAuth } from "@/context/AuthContext";

export default function AccountContent() {
  const { user } = useAuth();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Account Details</h1>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-start gap-8">
          <div className="w-32 h-32 bg-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-6xl text-white">
              {user?.name?.charAt(0).toUpperCase() || "X"}
            </span>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <div className="text-lg">{user?.name || "Loading..."}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Mobile No.
              </label>
              <div className="text-lg">{user?.mobile || "----"}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <div className="text-lg">{user?.email || "Loading..."}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
