const { Pool } = require('pg');
require('dotenv').config(); // Cargar variables de entorno

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);
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