// src/models/db.js
const { Pool } = require('pg');
require('dotenv').config(); // Cargar variables de entorno

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Exportar el método para ejecutar consultas
module.exports = {
  query: (text, params) => pool.query(text, params),
};