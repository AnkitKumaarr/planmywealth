import React from "react";

const RetakeButton = ({ handleRetake, currentStep }) => {
  return (
    <div className="flex justify-between items-center md:mt-4">
      {(currentStep > 0 || currentStep === 13) && (
        <button
          type="button"

          onClick={handleRetake}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4 sm:mb-0 text-sm"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="hidden sm:inline text-sm font-bold mr-2">Retake the test</span>
          <span className="sm:hidden text-xs font-bold mr-2">Restart</span>
        </button>



      )}
    </div>
  );
};

export default RetakeButton;
