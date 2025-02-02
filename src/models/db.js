const { Pool } = require('pg');
require('dotenv').config();

//conexión a Postgresql
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "content_store",
  password: "Basepost",
  port: 5432
});

// consultas
module.exports = {
  query: (text, params) => pool.query(text, params),
};