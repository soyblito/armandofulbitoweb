# Usa una imagen base de Node.js con Alpine para mantener el contenedor ligero
FROM node:18-alpine

# Define el argumento de entorno que se puede pasar en el build
#ARG NEXT_PUBLIC_API_BASE_URL
#ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias package.json y package-lock.json (si lo tienes)
COPY package*.json ./

# Instala TODAS las dependencias (producción + desarrollo)
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Elimina archivo .env si existe
RUN rm -f .env

# Construye la aplicación (Next.js usará NEXT_PUBLIC_API_BASE_URL si está en ENV)
RUN npm run build

# Elimina las dependencias de desarrollo para mantener el contenedor ligero (opcional)
RUN npm prune --production

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para iniciar la aplicación en modo de producción
CMD ["npm", "run", "start"]