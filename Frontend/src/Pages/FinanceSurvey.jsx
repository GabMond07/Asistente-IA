import React, { useState } from "react";
import { Navigation } from "../Components/Navigation";
import { useNavigate } from "react-router-dom";
import { hostLocal } from "../api/api";

const surveyQuestions = [
  {
    question: "¿Cuál es tu objetivo financiero principal?",
    options: ["Ahorro", "Inversión", "Deudas", "Otro"],
  },
  {
    question: "¿Cuál es tu nivel de experiencia en finanzas?",
    options: ["Principiante", "Intermedio", "Avanzado"],
  },
  {
     question: "¿Cuánto podrías ahorrar o invertir mensualmente?",
     options: ["Menos de $100", "Entre $100 y $500", "Entre $500 y $1000", "Más de $1000"],
   },
  {
    question: "¿Cuál es tu capital disponible actualmente?",
    options: ["Menos de $1,000", "Entre $1,000 y $5,000", "Entre $5,000 y $10,000", "Más de $10,000"],
  },
  {
    question: "¿Prefieres estrategias a corto o largo plazo?",
    options: ["Corto plazo", "Largo plazo"],
  },
];

const FinanceSurvey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswerSelection = (answer) => {
    const question = surveyQuestions[currentQuestionIndex].question;

    // Guarda la respuesta actual
    const updatedResponses = { ...responses, [question]: answer };
    setResponses(updatedResponses);

    // Avanza a la siguiente pregunta o envía el formulario si es la última
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit(updatedResponses); // Pasa las respuestas actualizadas a handleSubmit
    }
  };

  const handleSubmit = async (finalResponses) => {
    setLoading(true);

    try {
      const response = await fetch(`http://${hostLocal}/survey/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ responses: finalResponses }), // Envía las respuestas finales
      });

      if (!response.ok) {
        throw new Error("Error al guardar las respuestas");
      }

      navigate("/dashboard"); // Redirige al dashboard después de completar la encuesta
    } catch (error) {
      console.error("Error al enviar la encuesta:", error);
      alert("Ocurrió un error al enviar la encuesta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="text-white flex flex-col items-center justify-center min-h-screen bg-[#000013]">
        <h2 className="text-5xl font-bold mb-10">
          Cuéntanos sobre tus intereses financieros
        </h2>
        {currentQuestionIndex < surveyQuestions.length ? (
          <div className="text-center">
            <p className="text-xl mb-5">
              {surveyQuestions[currentQuestionIndex].question}
            </p>
            {surveyQuestions[currentQuestionIndex].options.map(
              (option, idx) => (
                <button
                  key={idx}
                  className="bg-blue-500 text-white px-6 py-3 m-2 rounded hover:bg-blue-700"
                  onClick={() => handleAnswerSelection(option)}
                >
                  {option}
                </button>
              )
            )}
            {/* Visor de progreso */}
            <div className="flex justify-center mt-8">
              {surveyQuestions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-4 h-4 mx-2 rounded-full ${
                    idx <= currentQuestionIndex ? "bg-blue-500" : "bg-gray-500"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <p>Gracias por completar la encuesta!</p>
        )}
        {loading && <p>Enviando respuestas...</p>}
      </div>
    </>
  );
};

export default FinanceSurvey;
