import React from "react";

const CloudNote = ({ text }) => {
  return (
    <div className="relative w-72 h-48 flex items-center justify-center mx-auto">
      {/* SVG de nube redondeada como fondo */}
      <svg viewBox="0 0 64 40" className="absolute w-full h-full">
        <path
          d="M20 30c-6 0-10-4-10-10 0-5.5 4.5-10 10-10 1.3 0 2.5.2 3.6.7 1.8-3.6 5.6-6.7 10.4-6.7 5.9 0 10.7 4.2 11.4 9.7C50 14 54 18 54 24c0 6-5 10-10 10H20z"
          fill="#b3e5fc" /* Cambia este color a lo que prefieras */
        />
      </svg>
      {/* Texto dentro de la nube */}
      <p className="text-center text-gray-800 font-semibold relative z-10 px-6">
        {text}
      </p>
    </div>
  );
};

export default CloudNote;
