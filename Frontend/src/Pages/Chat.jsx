// chat.jsx
import { Send, PenSquare, Paperclip, Bot } from "lucide-react";
import { Button } from "../components/Button";
import { Textarea } from "../Components/Textarea";
import { ScrollArea } from "../Components/Scrollarea";
import { Avatar, AvatarFallback, AvatarImage } from "../Components/Avatar";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Navigation } from "../Components/Navigation";
import IA from "../assets/IA.svg";

function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(["Nueva conversación"]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setHistory([...history, input]);
      // Simular respuesta del asistente
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Gracias por tu mensaje. ¿En qué más puedo ayudarte? Lorem daaabdkjasbdjka",
          },
        ]);
      }, 1000);
      setInput("");
    }
  };

  {
    ("La chida");
  }

  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [historial, setHistorial] = useState([]);

  const enviarPregunta = async () => {
    
    const [messages, setMessages] = useState([
      { role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte hoy?" },
    ]);

    if (!pregunta) return;

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
        setRespuesta(data.respuesta);
        setHistorial([...historial, { pregunta, respuesta: data.respuesta }]);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <div className="ml-34">
        <Navigation />
        <Sidebar className="fixed left-0 top-0 h-full" />
        <div className="flex flex-col flex-1 ml-60 pt-20">
          {" "}
          {/* Ajuste de margen y padding para respetar navbar y sidebar */}
          <div className="flex h-[calc(100vh-6rem)] bg-gray-100 p-4">
            {" "}
            {/* Ajusta la altura restando el navbar */}
            {/* Sidebar de historial */}
            <div className="w-64 bg-white p-4 border-r">
              <h2 className="text-lg font-semibold mb-4">Historial</h2>
              <ScrollArea className="h-full">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="mb-2 text-sm text-gray-600 hover:bg-gray-100 p-2 rounded cursor-pointer"
                  >
                    {item}
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
                      message.role === "user" ? "justify-end" : "justify-start"
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
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
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
    </>
  );
}

export default Chat;
