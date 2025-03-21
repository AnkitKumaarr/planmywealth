"use client";
import Loader from "@/components/Loader";
import { useFormData } from "@/context/FormContext";
import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import { useRouter } from "next/navigation";
import ReportSection from "./ReportSection";
import AdvisorProfileSection from "./AdvisorProfileSection";
import RefillDialog from "./RefillDialog";
import { usePDF } from "react-to-pdf";
import { FaArrowLeft } from "react-icons/fa";
import PDF from "./PDF";

// Update the PDF configuration with more specific options
const pdfOptions = {
  format: "a4",
  page: {
    margin: 25,
    orientation: "portrait",
  },
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: true,
    letterRendering: true,
    windowWidth: 1200,
  },
};

const GenerateReport = () => {
  const router = useRouter();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { formData } = useFormData();
  const { user } = useAuth();
  const [currentSection, setCurrentSection] = useState("");

  //   useEffect(() => {

  //   }, [formData, user]);

  const handleRefillClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    // feth the url and if it has id, then remove the id from the url
    const url = new URL(window.location.href);
    const uuid = url.searchParams.get("uuid");

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/reports/finalreview", {
          method: "POST",
          body: JSON.stringify({
            uuid: uuid,
          }),
        });
        const data = await response.json();
        const filteredData = data.result;

        setReport(filteredData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "feature-recipe",
        "things-to-remember",
        "recommended-plans",
        "how-to-buy",
      ];
      const offsets = sections.map(
        (section) => document.getElementById(section)?.offsetTop || 0
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < sections.length; i++) {
        if (
          scrollPosition >= offsets[i] &&
          (i === sections.length - 1 || scrollPosition < offsets[i + 1])
        ) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getColor = (section) => {
    return currentSection === section ? "bg-green-500" : "bg-gray-500";
  };

  const handleClick = (section) => {
    setCurrentSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  // Modify the download function to ensure content is properly rendered
  const handleDownloadPDF = async () => {
    // Add a class to the body when generating PDF
    document.body.classList.add("generating-pdf");

    // Wait for any images to load
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await toPDF(pdfOptions);
    } finally {
      // Remove the class after generation
      document.body.classList.remove("generating-pdf");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {isLoading ? (
        <div className="min-h-screen flex flex-col w-full justify-center items-center">
          <Loader size="90px" />
          <h1 className="text-2xl font-bold mb-2">Preparing your report</h1>
          <p className="text-lg text-gray-600">Analyzing your details...</p>
        </div>
      ) : (
        <>
          {/* Left Sidebar - Only visible on desktop */}
          <div className="hidden lg:block fixed left-0 top-0 h-full w-64 border-r border-gray-200 bg-white p-6">
            <div
              className="mb-4 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                width={210}
                height={120}
                src="/images/pmw_logo.png"
                alt="planmywealth Logo"
              />
              {/* <h1 className="text-3xl font-bold pl-4 text-green-500">
                <span className="text-black">Tru</span>Match
              </h1> */}
            </div>
            <Link
              href="/"
              className="flex text-gray-500 mb-8 text-sm font-bold"
            >
              <span className="mr-1 font-bold">←</span> Back to Homepage
            </Link>
            <nav className="space-y-6 border-dashed border-gray-200 border-l-2 ">
              <div className="flex items-center text-green-500 font-small hover:text-green-700 cursor-pointer">
                <a
                  onClick={() => handleClick("feature-recipe")}
                  className="flex items-center"
                >
                  <span
                    className={`w-2 h-2 ${getColor(
                      "feature-recipe"
                    )} rounded-full mr-2`}
                  ></span>
                  Feature Recipe
                </a>
              </div>
              <div className="flex items-center text-green-500 font-small hover:text-green-700 cursor-pointer">
                <a
                  onClick={() => handleClick("things-to-remember")}
                  className="flex items-center"
                >
                  <span
                    className={`w-2 h-2 ${getColor(
                      "things-to-remember"
                    )} rounded-full mr-2`}
                  ></span>
                  Things to Remember
                </a>
              </div>
              {/* <div className="flex items-center text-green-500 font-small hover:text-green-700 cursor-pointer">
                <a
                  onClick={() => handleClick("recommended-plans")}
                  className="flex items-center"
                >
                  <span
                    className={`w-2 h-2 ${getColor(
                      "recommended-plans"
                    )} rounded-full mr-2`}
                  ></span>
                  Recommended Plans
                </a>
              </div>
              <div className="flex items-center text-green-500 font-small hover:text-green-700 cursor-pointer">
                <a
                  onClick={() => handleClick("how-to-buy")}
                  className="flex items-center"
                >
                  <span
                    className={`w-2 h-2 ${getColor(
                      "how-to-buy"
                    )} rounded-full mr-2`}
                  ></span>
                  How to buy?
                </a>
              </div> */}
            </nav>
            <div className="absolute bottom-6 left-6 space-y-4">
              <button
                className="flex items-center text-green-600"
                onClick={handleRefillClick}
              >
                <span className="mr-2">↻</span> Refill form
              </button>
              {/* <div className="bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">FAQ's</h4>
                <div className="space-y-2 text-gray-600">
                  <button className="flex items-center justify-between w-full">
                    <span className="mr-2">💬</span> Why trust this report?{" "}
                    <span>→</span>
                  </button>
                  <button className="flex items-center justify-between w-full">
                    <span className="mr-2">💬</span> Why trust PlanMyWealth?{" "}
                    <span>→</span>
                  </button>
                </div>
              </div> */}
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden fixed top-0 left-0 right-0 w-full border-b border-gray-200 px-4  bg-white shadow-[0_4px_6px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-gray-500 font-medium">
                <span className="m-2 ">
                  <FaArrowLeft />
                </span>
              </Link>
              <div className="flex items-center justify-center">
                <Image
                  width={150}
                  height={80}
                  src="/images/pmw_logo.png"
                  alt="planmywealth Logo"
                />
              </div>
              {/* Empty div to maintain center alignment */}
              <div className="w-[52px]"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-64 lg:mr-80 print:m-0">
            <div
              className="px-4 lg:px-20 py-4 mt-16 lg:mt-0 print:px-0 print:mt-0"
              id="feature-recipe"
            >
              {/* Header Section */}
              <section className="pdf-section">
                <div className="pdf-content">
                  <h2 className="text-xl font-bold">
                    🎉 {user?.name?.split(" ")[0]}! Your Report is Ready!
                  </h2>
                </div>
              </section>

              <section className="pdf-section">
                <div className="pdf-content">
                  <h1 className="text-3xl font-semibold mb-8">
                    Here's the smartest way to financially secure your family
                  </h1>
                </div>
              </section>

              {/* Dynamic Sections */}
              <section className="pdf-section">
                <div className="pdf-content">
                  <ReportSection report={report} />
                </div>
              </section>

              {/* Disclaimer Section */}
              <section className="pdf-section">
                <div className="pdf-content">
                  <div className="mt-24 mb-12">
                    <p className="text-xs text-gray-600">
                      <span className="font-bold">Disclaimer:</span> While we
                      will refer to you only advisors who are credible, whom we
                      have personally interviewed, but at the same time you are
                      free to evaluate their services independently and decide
                      whether you want to go ahead with them or not. Plan My
                      Wealth won't be liable or responsible for the
                      conversations, decisions happening between you and the
                      advisor.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* PDF Content Container - Hidden but rendered */}
          <div
            ref={targetRef}
            className="fixed  pointer-events-none"
            style={{
              width: "1200px", // Fixed width for consistent PDF rendering
              height: "auto",
              zIndex: -1,
              top: 0,
              left: 0,
              transform: "translateX(-9999px)",
            }}
          >
            <PDF user={user} report={report} />
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block fixed right-0 top-0 h-full w-80 bg-white p-6 border-l">
            {/* Top Navigation */}
            <div className="flex justify-end items-center px-6 py-4 border-b">
              <div className="flex gap-4">
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center text-green-500 border border-green-500 rounded-lg px-4 py-2"
                >
                  <FiDownload className="mr-2" /> Report
                </button>

                <button className="flex items-center text-green-500 border border-green-500 rounded-lg px-4 py-2">
                  <FiDownload className="mr-2" /> Checklist
                </button>
              </div>
            </div>

            {/* Advisor Section */}
            <AdvisorProfileSection />
          </div>

          {/* Mobile Fixed Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] sm:shadow-none">
            <div className="container mx-auto max-w-md">
              <button
                onClick={() => toPDF({ format: "a4", page: { margin: 10 } })}
                className="w-full flex items-center justify-center text-green-500 border border-green-500 rounded-lg px-4 py-3 text-center"
              >
                <FiDownload className="mr-2" /> Download Report
              </button>
            </div>
          </div>

          {/* Add bottom padding on mobile to account for fixed bottom bar */}
          <div className="h-20 lg:hidden"></div>
        </>
      )}

      {/* Dialog */}
      {isDialogOpen && <RefillDialog handleDialogClose={handleDialogClose} />}
    </div>
  );
};

export default GenerateReport;

// src/components/InsuranceCoverageSection.js
