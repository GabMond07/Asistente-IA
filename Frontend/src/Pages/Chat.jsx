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
                    'Authorization': `Token ${localStorage.getItem('token')}` 
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
        <div className='flex flex-col items-center justify-center min-h-screen bg-[#000013]'>
            <h2 className='text-white font-bold text-center text-5xl mb-10'>Chat Asistente Financiero</h2>
            <input 
                className='text-black font-semibold text-xl mb-10 w-full rounded-lg border-2 border-[#007399] '
                type="text" 
                value={pregunta} 
                onChange={(e) => setPregunta(e.target.value)} 
                placeholder="Escribe tu pregunta..."
            />
            <button className='text-white font-semibold py-3 px-11 rounded-lg border-2 border-[#007399] shadow-[0px_0px_10px_3px_rgba(0,115,153,0.7)] hover:shadow-[0px_0px_15px_5px_rgba(0,115,153,1)] transition duration-300 ease-in-out transform hover:scale-105' onClick={enviarPregunta}>Enviar</button>

            <div className='mt-10'>
                <h3 className='text-white font-bold text-center text-2xl'>Respuesta</h3>
                <p className='text-white font-semibold text-center text-xl mb-10'>{respuesta}</p>
            </div>

            <div>
                <h3 className='text-white font-bold text-center text-2xl'>Historial</h3>
                {historial.map((item, index) => (
                    <div key={index} className="card">
                        <p className='text-white font-semibold text-center text-xl mb-10'><strong>Pregunta:</strong> {item.pregunta}</p>
                        <p className='text-white font-semibold text-center text-xl mb-10'><strong>Respuesta:</strong> {item.respuesta}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chat;
