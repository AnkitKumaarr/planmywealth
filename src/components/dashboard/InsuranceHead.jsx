import React from "react";
import { useRouter } from "next/navigation";
const InsuranceHead = () => {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24  ">
      <div className="mb-8">
        <p className="text-[#004F27]  text-2xl md:text-4xl mb-2 font-semibold">
          Did you know that{" "}
          <span className=" font-bold mb-3 text-[#08AD5B]">80% people</span> who
          created their financial plan achieved their goals!
        </p>
        {/* <p className="text-[#004F27]  text-md md:text-xl mb-2 font-semibold">
          Create your trumatch report now
        </p> */}

        <div className="mt-6">
          <span className="text-white font-semibold bg-[#08AD5B] rounded-full px-4 sm:px-4 py-2 sm:py-3 text-sm md:text-lg">
            Start Your Journey Today!
          </span>
        </div>
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-4 sm:mt-8 bg-green-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-green-600 transition-colors"
      >
        Get Started
      </button>
    </div>
  );
};

export default InsuranceHead;
