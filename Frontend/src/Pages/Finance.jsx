import React from "react";
import { Navigation } from "../Components/Navigation";
import IA from "../assets/IA.svg";
import { Link } from "react-router-dom";

const Finance = () => {
  return (
    <>
      <div className="min-h-screen  flex items-center justify-center">
        <main className="flex flex-col items-center text-center p-6">
          <h1 className="text-white font-bold text-5xl md:text-7xl mb-6 md:mb-10">
            Moninace
          </h1>
          <p className="text-white text-xl md:text-3xl mb-8 font-mono">
            ¡Maneja como pro tu dinero!
          </p>

          <div className="w-38 md:w-28 mb-5">
            <img src={IA} alt="FinanceIA Logo" className="w-full" />
          </div>

          <div className="flex space-x-8">
            <button className="text-white font-semibold py-2 px-4 rounded-lg border-2 border-[#007399] shadow-[0px_0px_10px_3px_rgba(0,115,153,0.7)] hover:shadow-[0px_0px_15px_5px_rgba(0,115,153,1)] transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/login">Iniciar sesión</Link>
            </button>
            <button className="text-white font-semibold py-2 px-4 rounded-lg border-2 border-[#007399] shadow-[0px_0px_10px_3px_rgba(0,115,153,0.7)] hover:shadow-[0px_0px_15px_5px_rgba(0,115,153,1)] transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/register">Registrarme</Link>
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Finance;
