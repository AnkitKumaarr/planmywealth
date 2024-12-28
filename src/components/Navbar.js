"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { colors } = useTheme();

  return (
    <nav
      style={{
        width: "100%",
        backgroundColor: colors.primary,
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          // alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1200px",
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            color: "black",
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "0.5rem 0",
            // textAlign: "center",
            width: "100%",
          }}
        >
          Returnly
        </h1>
      </div>
    </nav>
  );
}
