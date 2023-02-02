const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const options = {
     apis: ['./src/routes/auth.route.js','./src/models/users.js','./src/routes/user.routes.js','./src/models/product.js','./src/routes/product.route.js','./src/models/product.js'],
     definition: {
          openapi: '3.0.0',
          info: {
               title: 'Ecommerce',
               version: '0.0.9',
               description: 'API para ecommerce'
          },
     },
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app , port) => {
     app.use('/api/v1/docs', swaggerUI.serve , swaggerUI.setup(swaggerSpec));
     app.get('/api/v1/docs.json' , (req,res) => {
          res.setHeader({'Content-Type': 'application/json'});
          res.send(swaggerSpec);
     });
     console.log(`La documentacion esta disponible en ${process.env.URL}:${port}/api/v1/docs`)
}

module.exports = swaggerDocs;
