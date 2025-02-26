import React from "react";
import { Navigation } from "../Components/Navigation";
import { IA } from "../assets/IA.svg";

const Finance = () => {
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000013]">
        <img src={IA} alt="logo" className="w-1/2 h-1/2" />
        <p className="font-semibold text-white">¡Vamos a empezar!</p>
      </div>
    </>
  );
};

export default Finance;
