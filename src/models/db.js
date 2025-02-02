const { Pool } = require('pg');
require('dotenv').config(); // Cargar variables de entorno



// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "content_store",
  password: "Basepost",
  port: 5432
});

// Exportar el método para ejecutar consultas
module.exports = {
  query: (text, params) => pool.query(text, params),
};


module.exports = {
  query: (text, params) => pool.query(text, params),
};