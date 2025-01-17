"use client";
import React, { useState } from "react";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";

const ForgotPasswordForm = ({onClose}) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
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
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setMessage(data.message);
        toast.success("We have sent you a reset link to your email.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        onClose();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full flex-col items-center relative ">
        <input
          type="text"
          placeholder={errors.email || "Enter Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-10/12 h-10 p-3 mb-4 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded outline-none focus:border-green-500 my-8`}
        />
        <button
          type="submit"
          className="w-10/12 h-10 p-3 bg-green-500 hover:bg-green-400 text-white border-none rounded cursor-pointer flex items-center justify-center"
        >
          {loading ? <Loader size="24px" /> : "Send Reset Link"}
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </div>
      <ToastContainer />
    </form>
  );
};

export default ForgotPasswordForm;
