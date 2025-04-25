const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Envios Manager API',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema de gestión de envíos',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};
