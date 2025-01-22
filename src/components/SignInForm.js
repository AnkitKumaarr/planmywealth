"use client";
import { useState } from "react";
import Loader from "./Loader";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignInForm({ handleToggleView }) {
  const { login, handleSignInOpen } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const response = await login(formData);
      if (response.success) {
        // setMessage("Login successful!");
        toast.success("Successfully logged in!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleSignInOpen(false);
      } else {
        setMessage(response.error);
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full flex-col items-center relative">
        <input
          type="text"
          placeholder={errors.email || "Enter Email"}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-10/12 h-10 p-3 mb-4 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded outline-none focus:border-green-500`}
        />
        <div className="relative w-10/12 mb-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={errors.password || "Enter Password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={`w-full h-10 p-3 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded outline-none focus:border-green-500`}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <div className="flex w-10/12 justify-end  items-end mb-4">
          <button
            onClick={(e) => handleToggleView(e, "Forgot Password")}
            type="button"
            className="text-sm text-green-500 cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
        <button
          type="submit"
          className="w-10/12 h-10 p-3 bg-green-500 hover:bg-green-400 text-white border-none rounded cursor-pointer flex items-center justify-center"
        >
          {loading ? <Loader size="24px" /> : "Sign in"}
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </div>
      <ToastContainer />
    </form>
  );
}
