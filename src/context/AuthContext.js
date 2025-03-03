"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useFormData } from "@/context/FormContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { formData, currentStep, setCurrentStep } = useFormData();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignInOpen = (value) => {
    setIsSignInOpen(value);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 200) {
        const userData = await response.json();

        setUser(userData.data);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data.user);
        await checkAuth();
        return { success: true, message: "Login successful" };
      }

      return { success: false, error: "Invalid credentials" };
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const handleGoogleLogin = async () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("currentStep", JSON.stringify(currentStep));
    const currentPath = window.location.pathname + window.location.search;
    const stateData = {
      redirect_path: currentPath || "/",
      referId: localStorage.getItem("referId") || "",
      currentStep: currentStep || 17,
    };
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      state: JSON.stringify(stateData),
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  const handleGoogleCallback = async () => {
    try {
      const response = await fetch("/api/auth/callback", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data.data);
      }
    } catch (error) {
      console.error("Google login callback failed:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.status === 200) {
        setUser(null);
        localStorage.removeItem("formData");
        localStorage.removeItem("currentStep");
        localStorage.removeItem("referId");
        setCurrentStep(1); // Reset step after logout
        return true;
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSignInOpen,
        handleSignInOpen,
        login,
        logout,
        handleGoogleLogin,
        handleGoogleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
