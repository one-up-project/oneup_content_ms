const db = require('../models/db');

const getUsers = async (req, res) => {
  try {
    // Ejecutar una consulta SQL
    const result = await db.query('SELECT * FROM users');
    // Enviar los resultados como respuesta
    res.json(result.rows);
  } catch (err) {
    // Manejar errores
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers };