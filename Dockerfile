# imagen Node.js v22 como base
FROM node:22

# directorio de trabajo dentro del contenedor
WORKDIR /content_ms

# Copia los archivos necesarios al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto en el que corre la app
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "src/app.js"]