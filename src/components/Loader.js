import React from "react";

const Loader = ({ size = "14px" }) => {
  const loaderStyle = {
    border: "2px solid #f3f3f3", // Light grey
    borderTop: "4px solid #3498db", // Blue
    borderRadius: "50%",
    width: size,
    height: size,
    animation: "spin 1s linear infinite",
  };

  const spinKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{spinKeyframes}</style>
      <div style={loaderStyle}></div>
    </>
  );
};

export default Loader;
