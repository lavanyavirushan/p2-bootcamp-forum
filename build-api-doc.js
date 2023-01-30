const swaggerAutogen = require('swagger-autogen')()
require('dotenv').config();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3001;

console.log(HOST)
const doc = {
    info: {
      title: 'Bootcamp Forum API',
      description: 'Bootcamp blog post for students for students to learn/share knowledge',
    },
    basePath: '/api',
    host: `${HOST}:${PORT}`,
    schemes: ['http'],
  };
const outputFile = './swagger.json'
const endpointsFiles = ['./controllers/api/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)