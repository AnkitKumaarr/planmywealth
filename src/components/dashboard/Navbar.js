"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import SignInDialog from "../SignInDialog";
import { ToastContainer, toast } from "react-toastify";
import { FaUser, FaHeadset, FaSignOutAlt, FaComments } from "react-icons/fa";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const { user, loading, logout, isSignInOpen, handleSignInOpen } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const success = await logout();
    setIsLoggingOut(false);
    if (success) {
      router.push("/");
      toast.success("Successfully logged out!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm h-16 fixed w-full top-0 z-40">
      <div className="h-full px-4 md:px-[96px] flex items-center justify-between">
        {/* Menu button for mobile */}


        {user && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        )}

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              width={200}
              height={70}
              src="/images/PlanYourWealth.png"
              alt="planmywealth Logo"
            />
          </Link>
        </div>

        {/* Right side content */}
        <div className="flex items-center space-x-4">
          {/* Add your navbar items here */}
          <div className="relative group">
            {loading ? (
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>
            ) : user ? (
              <div className="flex items-center justify-center">
                <button className="flex items-center space-x-3 focus:outline-none ">
                  <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center text-white">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="text-gray-700 hidden sm:block">
                    My Account
                  </span>
                </button>

                <div className="hidden group-hover:block absolute right-0 mt-80 w-72 bg-white rounded-lg shadow-lg py-1 z-50">
                  <div className="px-6 py-4 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center text-white text-xl">
                        {user?.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-800">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center  space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      <FaUser className="text-gray-400" />
                      <span>My Account</span>
                    </Link>

                    <Link
                      href="/discuss-with-advisor"
                      className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      <FaComments className="text-gray-400" />
                      <span>Discuss with Advisor</span>
                    </Link>

                    <div className="flex items-center space-x-3 px-6 py-3 text-gray-700">
                      <FaHeadset className="text-gray-400" />
                      <span>Support: +91 8369547450</span>
                    </div>

                    <div className="border-t mt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-6 py-3 text-red-600 hover:bg-gray-50"
                        disabled={isLoggingOut}
                      >
                        <FaSignOutAlt />
                        <span>
                          {isLoggingOut ? "Logging out..." : "Sign out"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                onClick={() => handleSignInOpen(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      <SignInDialog
        isOpen={isSignInOpen}
        onClose={() => handleSignInOpen(false)}
      />
      <ToastContainer />
    </nav>
  );
}
