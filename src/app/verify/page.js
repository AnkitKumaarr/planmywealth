"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch("/api/auth/verifyemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          router.push(`/verifiedstatus?status=success`);
        } else {
          router.push(
            `/verifiedstatus?status=error&error=${encodeURIComponent(
              data.error
            )}`
          );
        }
      } catch (error) {
        router.push(
          `/verifiedstatus?status=error&error=${encodeURIComponent(
            "An unexpected error occurred"
          )}`
        );
      }
    };

    if (token) {
      verifyEmail();
    } else {
      router.push(
        "/verifiedstatus?status=error&error=No verification token provided"
      );
    }
  }, [token, router]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
            <h2 className="text-3xl font-bold">Verifying your email...</h2>
            <p className="mt-2">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
