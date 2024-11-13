# services.py
import os
from dotenv import load_dotenv
import openai

load_dotenv()

openai.api_key = os.getenv("API_KEY")

def obtener_respuesta_chatgpt(pregunta):
    try:
        respuesta = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": pregunta}
            ],
            max_tokens=150
        )
        respuesta_texto = respuesta['choices'][0]['message']['content']
        return respuesta_texto
    except Exception as e:
        raise e 
        
