FROM python:3.10

# Establecer directorio de trabajo
WORKDIR /app/

RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copiar dependencias
COPY requirements.txt /app/

# Instalar dependencias de Python
RUN pip3 install --upgrade pip -r requirements.txt

# Copiar el código fuente
COPY . /app/

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
