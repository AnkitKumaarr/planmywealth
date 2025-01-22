"use client";
import { useState } from "react";
import Loader from "./Loader";

export default function SignUpForm({ isVerified, setIsVerified, setIsSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full Name is required.";
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

  const handleVerification = () => {
    setIsSignUp("Sign In");
    setIsVerified(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          referId: localStorage.getItem("referId") || "",
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.error) {
        setMessage(data.error);
      } else if (data.status === 200) {
        setIsVerified(true);
        setMessage("Sign in successful!");
      }
    } catch (error) {
      setMessage("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 border-4 border-[#89c9a4] rounded-full">
          <span className="text-green-500 text-4xl">&#x2714;</span>
        </div>
        <p>We just emailed a verification link</p>
        <p>
          Please click on the link that has just been sent, to your email
          account and come back here again!
        </p>
        <button
          onClick={handleVerification}
          className="mt-4 p-3 w-10/12  bg-black hover:bg-gray-800 text-white rounded"
        >
          I have verified!
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full flex-col items-center relative">
        <input
          type="text"
          placeholder={errors.fullName || "Full Name"}
          className={`w-10/12 h-10 p-3 mb-4 border ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          } rounded outline-none focus:border-green-500`}
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        <input
          type="email"
          placeholder={errors.email || "Email"}
          className={`w-10/12 h-10 p-3 mb-4 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded outline-none focus:border-green-500`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="relative w-10/12 mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={errors.password || "Password"}
            className={`w-full h-10 p-3  border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded outline-none focus:border-green-500`}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
          {loading ? <Loader size="24px" /> : "Sign up"}
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    </form>
  );
}
