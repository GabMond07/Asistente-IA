import React from "react";

export const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-5 py-3  bg-blue-400 text-white rounded hover:bg-blue-600 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
