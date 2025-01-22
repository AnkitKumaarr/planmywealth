import React from "react";
import { CgProfile } from "react-icons/cg";

const AdvisorProfileSection = ({ flow }) => {
  return (
    <div className="bg-green-50 rounded-lg p-6 mb-6">
      <div
        className={`justify-center items-center ${
          flow === "horizontal" ? "flex flex-row" : "flex flex-col"
        }`}
      >
        <div className="flex flex-col justify-center items-center flex-1">
          <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm inline-block mb-4">
            👤 Advisor Matched To You
          </span>
          <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden">
            <CgProfile className="w-full h-full text-gray-400" />
          </div>
          <div className="text-green-500 text-sm mb-2">✓ VERIFIED</div>
          <h3 className="text-xl font-bold mb-1">Manish</h3>
          <p className="text-gray-600 mb-1">Perfect Consultant</p>
        </div>
        <div className="flex flex-col justify-center items-start flex-1">
          {flow === "horizontal" && (
            <>
              <h3 className="text-xl font-bold mb-1">Need an expert's help?</h3>
              <p className="text-gray-600 mb-1 text-sm">
                Consult Real Experts from the Beshak community with 5+ yrs of
                experience in Health Insurance. Zero spam. Zero charges.
              </p>
            </>
          )}

          <button className=" bg-green-500 text-white py-2 px-4 rounded-lg">
            Discuss with Advisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisorProfileSection;
