// chat.jsx
import { Send, PenSquare, Paperclip, Bot } from "lucide-react";
import { Button } from "../components/Button";
import { Textarea } from "../Components/Textarea";
import { ScrollArea } from "../Components/Scrollarea";
import { Avatar, AvatarFallback, AvatarImage } from "../Components/Avatar";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Navigation } from "../Components/Navigation";

function Chat() {
  const [pregunta, setPregunta] = useState(""); // Pregunta del usuario
  const [respuesta, setRespuesta] = useState(""); // Respuesta de la IA
  const [historial, setHistorial] = useState([]); // Historial de preguntas
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ]);

  const enviarPregunta = async () => {
    if (!pregunta) return;
    setMessages([...messages, { role: "user", content: pregunta }]);
    try {
      const response = await fetch(
        "http://localhost:8000/api/consulta-chatgpt/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ pregunta }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages([
          ...messages,
          { role: "user", content: pregunta },
          { role: "assistant", content: data.respuesta },
        ]);

        setHistorial([
          ...historial,
          { pregunta }, // solo guardamos la pregunta del usuario en el historial
        ]);

        setPregunta(""); // Limpiar el campo de entrada después de enviar
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <div className="ml-24 h-screen w-full">
        <Navigation />
        <Sidebar className="fixed left-0 top-0 h-full" />
        <div className="flex-1 p-20 ml-12 flex flex-col">
          <div className="container mx-auto p-5 space-y-4 ">
            <div className="flex h-[calc(90vh-6rem)] bg-gray-100 p-4 shadow rounded-lg">
              <div className="w-64 bg-white p-4 border-r overflow-hidden">
                <h2 className="text-lg font-semibold mb-4 over">Historial</h2>
                <ScrollArea className="h-full">
                  {historial.map((item, index) => (
                    <div
                      key={index}
                      className="mb-2 text-sm text-gray-600 hover:bg-gray-100 p-2 rounded cursor-pointer"
                    >
                      <strong>Pregunta</strong> {item.pregunta}
                    </div>
                  ))}
                </ScrollArea>
              </div>
              {/* Área principal del chat */}
              <div className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start mb-4 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="mr-2">
                          <AvatarFallback>
                            <Bot />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`p-3 rounded-lg max-w-md ${
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-white"
                        }`}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </ScrollArea>

                {/* Entrada de mensaje */}
                <div className="p-4 bg-white border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                      <span className="sr-only">Adjuntar archivo</span>
                    </Button>
                    <Textarea
                      value={pregunta}
                      onChange={(e) => setPregunta(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="flex-grow"
                    />
                    <Button onClick={enviarPregunta}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Enviar</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <PenSquare className="h-4 w-4" />
                      <span className="sr-only">Modificar pregunta</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
