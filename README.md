# Megatech Esmeraldas – Backend

Este proyecto corresponde al backend del sistema Megatech Esmeraldas, desarrollado con Node.js, Express y MongoDB. Su función principal es gestionar los pedidos y brindar la estructura base para el funcionamiento del sistema.

Instalación y Ejecución

Para poner en marcha el backend es necesario instalar primero las dependencias del proyecto. Luego, se puede iniciar el servidor usando nodemon, lo que permite que el servidor se reinicie automáticamente cada vez que se modifica un archivo. El servidor también establece una conexión inicial con MongoDB y carga los middlewares principales para manejar JSON, CORS y archivos estáticos.

Pasos esenciales:

1. Instalar dependencias:

npm install


2. Ejecutar el servidor con nodemon apuntando a index.js:

nodemon ./index.js

(O usando el script definido en package.json:)

npm run dev


3. El servidor queda disponible en el puerto configurado (por defecto 3000).


# Descripción Resumida de las Rutas de la API

La API utiliza como ruta base:

/electrodomestico/

Dentro de esta ruta se encuentran las rutas relacionadas con pedidos, accesibles mediante:

/electrodomestico/pedidos

Estas rutas permiten realizar las operaciones principales:

GET / — Obtiene todos los pedidos.

GET /:id — Obtiene un pedido por su ID.

POST / — Crea un nuevo pedido.

PUT /:id — Actualiza un pedido existente.

DELETE /:id — Elimina un pedido por ID.

Este proyecto me permitió fortalecer mis conocimientos en desarrollo backend con Node.js y Express. Al organizar las rutas y trabajar con MongoDB, entendí mejor cómo funciona una API real y cómo estructurarla correctamente. Considero que esta experiencia ha sido muy valiosa para mejorar mis habilidades y me motiva a seguir aprendiendo y creando proyectos más completos.
