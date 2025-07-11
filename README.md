# React + TypeScript + Vite

Hola!

Para poder correr este proyecto solo se necesita tener instalador nodejs en version 
estable y ejecutar los siguientes comandos: 


Instalar las dependemcias

  npm install 

Correr el proyecto: 

  npm run dev

el proyecto cuenta con un archivo de variables de entorno con la siguiente variable: 


  VITE_API="URL del su backen"
  VITE_URL_PROFILE_IMAGE="URL para poder ver las imagenes de perfil."


Para crear la dockerizacion del API se tiene que ejecutar los siguientes comandos:

  - docker-compose up -d elasticsearch fluentd
  - docker-compose up -d mysql backend
  - docker-compose up -d nginx