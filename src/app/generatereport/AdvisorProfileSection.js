import React from "react";
import { CgProfile } from "react-icons/cg";

const AdvisorProfileSection = ({ flow }) => {
  return (
    <div className="bg-blue-100 rounded-lg p-4 sm:p-6 ">
      <div
        className={`gap-6 ${
          flow === "horizontal" ? "lg:flex-row flex flex-col" : "flex flex-col"
        }`}
      >
        {/* Profile Section */}
        <div className="flex flex-col justify-center items-center flex-1 mb-6 lg:mb-0">
          <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm inline-block mb-4 whitespace-nowrap">
            👤 Advisor Matched To You
          </span>
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 rounded-full overflow-hidden bg-gray-100">
            <CgProfile className="w-full h-full text-gray-400" />
          </div>
          <div className="text-green-500 text-sm mb-2 flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            VERIFIED
          </div>
          <h3 className="text-xl font-bold mb-1 text-center">Manish</h3>
          <p className="text-gray-600 mb-4 text-center">Perfect Consultant</p>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center items-center lg:items-center flex-1">
          {flow === "horizontal" && (
            <>
              <h3 className="text-xl font-bold mb-2 text-center lg:text-left">
                Need an expert's help?
              </h3>
              <p className="text-gray-600 mb-4 text-sm text-center lg:text-left max-w-md">
                Consult Real Experts from the PlanMyWealth community with 5+ yrs
                of experience in Health Insurance. Zero spam. Zero charges.
              </p>
            </>
          )}

          <button className="bg-green-500 hover:bg-green-700 transition-colors text-white py-2 px-6 rounded-lg w-full sm:w-auto">
            Discuss with Advisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisorProfileSection;
