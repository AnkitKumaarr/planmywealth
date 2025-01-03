import Image from "next/image";
import { useState } from "react";

export default function SignInDialog({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleView = (e) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[90%] sm:w-[85%] max-w-3xl relative flex flex-col sm:flex-row">
            <div className="hidden sm:flex flex-col items-start flex-1 bg-[#bcf3f5] px-4 sm:px-8 py-8 sm:py-16 rounded-t-lg sm:rounded-l-lg">
              <Image
                width={200}
                height={200}
                src="/images/PlaneMyWealth.png"
                alt="planmywealth Logo"
                className="mb-4 ml-0"
              />
              <h3 className="text-lg sm:text-xl mb-4 font-bold">
                Join The 1st Neutral <br /> Insurance Community Ever!
              </h3>
              <p className="text-[#6B46C1] mb-4">
                10000+ Members and counting!
              </p>
              <ul className="list-none p-0">
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✓</span>
                  Make regret-proof decisions, through our unbiased tools.
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✓</span>
                  Consult real insurance experts for free!
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✓</span>
                  Access to the deepest, widest research in india.
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center flex-1 px-4 sm:px-8 py-8 sm:py-16 rounded-b-lg sm:rounded-l-none">
              <button
                onClick={onClose}
                className="absolute right-4 top-1 border-none bg-none text-4xl cursor-pointer"
              >
                x
              </button>
              <h1 className="text-center text-xl sm:text-2xl font-bold mb-1">
                {isSignUp ? "Sign up" : "Sign in"}
              </h1>
              <p className="text-center text-xs text-gray-600 mb-4 font-semibold">
                NO CHARGES. 100% FREE.
              </p>
              <button className="w-10/12 h-10 p-3 mb-1 border border-gray-300 rounded flex items-center justify-center gap-2 cursor-pointer bg-white">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5"
                />
                Continue with Google
              </button>

              <div className="text-center my-4">OR</div>

              {isSignUp ? (
                <>
                  <div className="flex w-full flex-col items-center">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-10/12 h-10 p-3 mb-4 border border-gray-300 rounded outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-10/12 h-10 p-3 mb-4 border border-gray-300 rounded outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-10/12 h-10 p-3 mb-4 border border-gray-300 rounded outline-none"
                    />
                    <button className="w-10/12 h-10 p-3 bg-green-500 text-white border-none rounded cursor-pointer">
                      Sign up
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex w-full flex-col items-center">
                  <input
                    type="text"
                    placeholder="Enter Email/Mobile number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-10/12 h-10 p-3 mb-4 border ${
                      isFocused ? "border-green-500" : "border-gray-300"
                    } rounded outline-none`}
                  />

                  <button className="w-10/12 text-center p-3 bg-green-500 text-white border-none rounded cursor-pointer">
                    Sign in
                  </button>
                </div>
              )}

              <div className="text-center text-sm mt-4">
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <a
                      href="#"
                      onClick={handleToggleView}
                      className="text-green-500"
                    >
                      Sign In
                    </a>
                  </>
                ) : (
                  <>
                    New to PlanMyWealth?{" "}
                    <a
                      href="#"
                      onClick={handleToggleView}
                      className="text-green-500 "
                    >
                      Create Account
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
