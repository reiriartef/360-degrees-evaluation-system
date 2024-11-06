const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Configuración básica de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Evaluación 360 Grados",
      version: "1.0.0",
      description:
        "Documentación de la API para el sistema de evaluación 360 grados",
    },
    servers: [
      {
        url: "http://localhost:5000", // Cambia esto si tu API corre en otra URL
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Ruta de los archivos de rutas para generar la documentación automáticamente
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
