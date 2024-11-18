import React from "react";

export function Button({ children, onClick, type = "button", className = "", disabled = false, variant = "primary" }) {
  // Define los estilos base y variantes
  const baseStyles = "px-4 py-2 rounded font-medium focus:outline-none focus:ring";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
