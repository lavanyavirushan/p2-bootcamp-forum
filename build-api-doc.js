const swaggerAutogen = require('swagger-autogen')()
const PORT = process.env.PORT || 3001;
const doc = {
    info: {
      title: 'Bootcamp Forum API',
      description: 'Bootcamp blog post for students for students to learn/share knowledge',
    },
    basePath: '/api',
    host: `localhost:${PORT}`,
    schemes: ['http'],
  };
const outputFile = './swagger.json'
const endpointsFiles = ['./controllers/api/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)