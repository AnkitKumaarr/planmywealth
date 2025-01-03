"use client";

import { useTheme } from "@/context/ThemeContext";
import { useApp } from "@/context/AppContext";
import SettingSidebar from "@/components/SettingSidebar";
import InsuranceForm from "@/components/InsuranceForm";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { colors } = useTheme();
  const { variables } = useApp();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.background,
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          flex: 1,
          width: "100%",
          margin: "0",
          backgroundColor: "#E2F6E9",
        }}
      >
        <InsuranceForm />
        {/* <SettingSidebar /> */}
        
      </div>
    </div>
  );
}
