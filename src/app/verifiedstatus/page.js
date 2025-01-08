"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function VerificationStatus() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const errorMessage = searchParams.get("error");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white py-4 shadow-md fixed top-0 left-0 flex ">
        <Image
          src="/images/PlaneMyWealth.png"
          alt="Plan My Wealth Logo"
          width={200}
          height={40}
          priority
        />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {status === "success" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-600">
              Email Verified!
            </h2>
            <p className="mt-2">Your email has been successfully verified.</p>
            <Link
              href="/"
              className="mt-4 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-400"
            >
              Sign In
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600">
              Verification Failed
            </h2>
            <p className="mt-2 text-red-500">{errorMessage}</p>
            <Link
              href="/"
              className="mt-4 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-400"
            >
              Go to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
