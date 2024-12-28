"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function SettingSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    theme,
    colors,
    buttonStyles,
    activeColor,
    toggleTheme,
    changeActiveColor,
  } = useTheme();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: colors[activeColor].main,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease-in-out",
          zIndex: 1000,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = colors[activeColor].dark;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = colors[activeColor].main;
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-400px",
          width: "400px",
          height: "100vh",
          backgroundColor: colors.background,
          boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
          transition: "right 0.3s ease-in-out",
          zIndex: 999,
          padding: "2rem",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginBottom: "2rem", color: colors[activeColor].main }}>
          Settings
        </h2>

        {/* Theme Toggle */}
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              marginBottom: "1rem",
              color:
                activeColor === "primary" ? colors.primary.main : colors.text,
            }}
          >
            Theme
          </h3>
          <button
            onClick={toggleTheme}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              backgroundColor: colors[activeColor].main,
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        {/* Color Palette */}
        <div>
          <h3
            style={{
              marginBottom: "1rem",
              color:
                activeColor === "primary" ? colors.primary.main : colors.text,
            }}
          >
            Color Palette
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: "1rem",
            }}
          >
            {["primary", "secondary", "accent", "error", "success"].map(
              (color) => (
                <div
                  key={color}
                  style={{ textAlign: "center" }}
                  onClick={() => changeActiveColor(color)}
                >
                  <div
                    style={{
                      width: "100%",
                      paddingBottom: "100%",
                      backgroundColor: colors[color].main,
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                      transition: "all 0.2s ease-in-out",
                      cursor: "pointer",
                      border:
                        color === activeColor
                          ? `3px solid ${colors.text}`
                          : "none",
                      transform:
                        color === activeColor ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color:
                        color === activeColor
                          ? colors[activeColor].main
                          : colors.text,
                      transition: "all 0.2s ease-in-out",
                      fontWeight: color === activeColor ? "bold" : "normal",
                    }}
                  >
                    {color}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
