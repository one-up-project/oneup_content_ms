const { Pool } = require("pg");
require("dotenv").config();

//conexión a Postgresql
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// consultas
module.exports = {
  query: (text, params) => pool.query(text, params),
};
