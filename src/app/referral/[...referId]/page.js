"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ReferralPage() {
  const router = useRouter();


  useEffect(() => {
    const saveReferralCode = async () => {
      const pathSegments = window.location.pathname.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];
      localStorage.setItem("referId", lastSegment);
      router.push("/");
    };
    saveReferralCode();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white py-4 shadow-md fixed top-0 left-0 flex ">
        <Image
          src="/images/PlaneMyWealth.png"
          alt="Plan My Wealth Logo"
          width={200}
          height={40}
          priority
        />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div>
          <h2 className="text-3xl font-bold">Please wait...</h2>
          {/* <p className="mt-2">
            Please wait while we verify your email address.
          </p> */}
        </div>
      </div>
    </div>
  );
}
