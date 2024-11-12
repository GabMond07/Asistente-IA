// chat.jsx
import React, { useState } from 'react';

function Chat() {
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [historial, setHistorial] = useState([]);

    const enviarPregunta = async () => {
        if (!pregunta) return;

        try {
            const response = await fetch('http://localhost:8000/api/consulta-chatgpt/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({ pregunta }),
            });
            
            const data = await response.json();

            if (response.ok) {
                setRespuesta(data.respuesta);
                setHistorial([...historial, { pregunta, respuesta: data.respuesta }]); 
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div>
            <h2>Chat Asistente Financiero</h2>
            <input 
                type="text" 
                value={pregunta} 
                onChange={(e) => setPregunta(e.target.value)} 
                placeholder="Escribe tu pregunta..."
            />
            <button onClick={enviarPregunta}>Enviar</button>

            <div>
                <h3>Respuesta</h3>
                <p>{respuesta}</p>
            </div>

            <div>
                <h3>Historial</h3>
                {historial.map((item, index) => (
                    <div key={index} className="card">
                        <p><strong>Pregunta:</strong> {item.pregunta}</p>
                        <p><strong>Respuesta:</strong> {item.respuesta}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chat;
