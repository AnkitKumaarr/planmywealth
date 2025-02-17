"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import Loader from "@/components/Loader";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password === "") {
      setErrors({ ...errors, password: "Password is required" });
      return;
    }
    if (confirmPassword === "") {
      setErrors({ ...errors, confirmPassword: "Confirm Password is required" });
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (!token) {
      setMessage("Invalid token");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        toast.success("Password reset successful.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(data.error, {
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
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(data.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     if (!token) {
  //       router.push(
  //         "/verifiedstatus?status=error&error=No verification token provided"
  //       );
  //     }
  //   }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white py-4 shadow-md fixed top-0 left-0 flex ">
        <Image
          src="/images/pmw_logo.png"
          alt="Plan My Wealth Logo"
          width={200}
          height={40}
          priority
        />
      </div>

      {/* <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div>
          <h2 className="text-3xl font-bold">Resetting your password...</h2>
          <p className="mt-2">Please wait while we reset your password.</p>
        </div>
      </div> */}
      <h2 className="text-2xl font-bold text-center mb-12">Reset Password</h2>

      {success ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Password reset successful.</h2>
          <p className="mt-2">You can now login with your new password.</p>
        </div>
      ) : (
        <form onSubmit={resetPassword} className="w-1/4">
          <div className="flex w-full  flex-col items-center relative border border-gray-300 rounded-md shadow-md px-4 py-8">
            <div className="relative w-10/12 mb-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={errors.password || "Enter Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full h-10 p-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded outline-none focus:border-green-500 my-4`}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="relative w-10/12 mb-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={errors.confirmPassword || "Confirm Password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full h-10 p-3 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded outline-none focus:border-green-500 my-4`}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <button
              type="submit"
              className="w-10/12 h-10 p-3 bg-green-500 hover:bg-green-400 text-white border-none rounded cursor-pointer flex items-center justify-center"
            >
              {loading ? <Loader size="24px" /> : "Reset Password"}
            </button>
            {message && <p className="text-red-500">{message}</p>}
          </div>
          <ToastContainer />
        </form>
      )}
    </div>
  );
}
