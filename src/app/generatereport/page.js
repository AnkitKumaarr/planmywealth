"use client";
import Navbar from "@/components/dashboard/Navbar";
import Loader from "@/components/Loader";
import React, { useState } from "react";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);
  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader size="90px" />
          <h1 className="text-2xl font-bold mb-2">Preparing your report</h1>
          <p className="text-lg text-gray-600">Analyzing your details...</p>
        </div>
      ) : (
        <div>
          <h1>Report</h1>
        </div>
      )}
    </>
  );
};

export default page;
