"use client";

import { useState } from "react";
import SignInDialog from "./SignInDialog";
import Image from "next/image";

export default function Navbar() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          width: "100%",
          padding: "1rem",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Image
            width={200}
            height={200}
            src="/images/PlanYourWealth.png"
            alt="planmywealth Logo"
            style={{ marginBottom: "1rem" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{
                border: "none",
                padding: "10px 40px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: "pointer",
                borderRadius: "12px",
                transition: "background-color 0.3s",
              }}
              onClick={() => setIsSignInOpen(true)}
            >
              SignIn
            </button>
          </div>
        </div>
      </nav>

      <SignInDialog
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </>
  );
}
