require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const db = require('./models/db');
const { typeDefs, resolvers } = require('./graphql/index'); // Importa typeDefs y resolvers por separado

const app = express();
const port = process.env.PORT || 4000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar Apollo Server
const server = new ApolloServer({
  typeDefs, // Pasa typeDefs como una cadena de texto (string)
  resolvers, // Pasa los resolvers
  context: { db }, // Pasa la conexión a la base de datos al contexto
});

// Función asíncrona para iniciar el servidor
async function startServer() {
  // Iniciar Apollo Server
  await server.start();

  // Aplicar middleware de Apollo Server a Express
  server.applyMiddleware({ app });

  // Ruta de prueba
  app.get('/', (req, res) => {
    res.send('¡Backend con Node.js y PostgreSQL!');
  });

  // Iniciar servidor
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`GraphQL en http://localhost:${port}${server.graphqlPath}`);
  });
}

// Llamar a la función para iniciar el servidor
startServer();