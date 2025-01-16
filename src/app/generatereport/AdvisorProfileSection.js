import React from "react";
import { CgProfile } from "react-icons/cg";

const AdvisorProfileSection = () => {
  return (
    <div className="bg-green-50 rounded-lg p-6 mb-6">
      <div className="text-center">
        <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm inline-block mb-4">
          👤 Advisor Matched To You
        </span>
        <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden">
          <CgProfile className="w-full h-full text-gray-400" />
        </div>
        <div className="text-green-500 text-sm mb-2">✓ VERIFIED</div>
        <h3 className="text-xl font-bold mb-1">Manish</h3>
        <p className="text-gray-600 mb-1">Perfect Consultant</p>

        <button className="w-full bg-green-500 text-white py-2 rounded-lg">
          Discuss with Advisor
        </button>
      </div>
    </div>
  );
};

export default AdvisorProfileSection;
