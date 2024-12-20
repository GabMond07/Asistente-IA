import React from "react";
import { Navigation } from "../Components/Navigation";

const Finance = () => {
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000013]">
        <svg
          width="450"
          height="450"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fondo oscuro */}

          {/* Efecto de brillo en el centro */}
          <circle
            cx="200"
            cy="200"
            r="40"
            fill="url(#glowGradient)"
            filter="url(#blur)"
          />

          {/* Núcleo central brillante */}
          <circle cx="200" cy="200" r="10" fill="#00BFFF" />

          {/* Anillos holográficos con rotación */}
          <g>
            <circle
              cx="200"
              cy="200"
              r="30"
              fill="none"
              stroke="url(#holoGradient)"
              strokeWidth="2"
              opacity="0.7"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 200"
                to="360 200 200"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="200"
              cy="200"
              r="60"
              fill="none"
              stroke="url(#holoGradient)"
              strokeWidth="5"
              opacity="0.5"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 200 200"
                to="0 200 200"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="200"
              cy="200"
              r="75"
              fill="none"
              stroke="url(#holoGradient)"
              strokeWidth="1.5"
              opacity="0.4"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 200"
                to="360 200 200"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="url(#holoGradient)"
              strokeWidth="5"
              opacity="0.4"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 200"
                to="360 200 200"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="200"
              cy="200"
              r="90"
              fill="none"
              stroke="url(#holoGradient)"
              strokeWidth="7"
              opacity="0.4"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 200"
                to="360 200 200"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="200"
              cy="200"
              r="130"
              fill="none"
              stroke="url(#holoGradient)"
              strokeWidth="1.5"
              opacity="0.4"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 200"
                to="360 200 200"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Redes neuronales con desenfoque y animación */}
          <g filter="url(#connectionBlur)">
            {/* Líneas de conexión asimétricas */}
            <line
              x1="200"
              y1="200"
              x2="240"
              y2="130"
              stroke="#00BFFF"
              strokeWidth="1"
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.8;0.2;0.8"
                dur="4s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="200"
              y1="200"
              x2="160"
              y2="270"
              stroke="#00BFFF"
              strokeWidth="1.2"
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur="5s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="200"
              y1="200"
              x2="300"
              y2="210"
              stroke="#00BFFF"
              strokeWidth="0.8"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0.6;0.2;0.6"
                dur="4s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="200"
              y1="200"
              x2="100"
              y2="190"
              stroke="#00BFFF"
              strokeWidth="1"
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0.7;0.3;0.7"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>

            {/* Nodos en la red con efecto de pulsación */}
            <circle cx="240" cy="130" r="3" fill="#00BFFF" opacity="0.8">
              <animate
                attributeName="r"
                values="3;5;3"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="160" cy="270" r="3" fill="#00BFFF" opacity="0.8">
              <animate
                attributeName="r"
                values="3;5;3"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="300" cy="210" r="3" fill="#00BFFF" opacity="0.7">
              <animate
                attributeName="r"
                values="3;5;3"
                dur="1.3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="100" cy="190" r="3" fill="#00BFFF" opacity="0.7">
              <animate
                attributeName="r"
                values="3;5;3"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Definiciones de gradiente y desenfoque */}
          <defs>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                style={{ stopColor: "#00BFFF", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#000013", stopOpacity: 0 }}
              />
            </radialGradient>

            <linearGradient
              id="holoGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#00BFFF", stopOpacity: 0.6 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#000013", stopOpacity: 0 }}
              />
            </linearGradient>

            <filter id="blur">
              <feGaussianBlur stdDeviation="10" />
            </filter>

            <filter id="connectionBlur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
        </svg>
        <p className="font-semibold text-white">¡Vamos a empezar!</p>
      </div>
    </>
  );
};

export default Finance;
