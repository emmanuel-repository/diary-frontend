# Etapa 1: Build de la app
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar archivos estáticos compilados
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]