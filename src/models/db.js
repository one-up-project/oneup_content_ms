const { Pool } = require('pg');
require('dotenv').config();

//conexión a Postgresql
const pool = new Pool({
  user: "postgres",
  host: "34.133.227.193",
  database: "content_store",
  password: "PA(K~Q{69ISlLt3@",
  port: 5432
});

// consultas
module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};