const express = require("express");
const cors = require("cors");
const randomBagsRouter = require("./routes/randomBags");
const { pool } = require("./models/db");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/store", randomBagsRouter);
// Función para probar la conexión
const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa:", res.rows[0]);
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
};

const testSelect = async () => {
  try {
    const result = await pool.query("SELECT * FROM random_bag");
    console.log("Datos de random_bag:", result.rows);
  } catch (err) {
    console.error("Error al realizar la consulta:", err);
  }
};

testSelect();
// Llamada a la función de prueba
testConnection()
app.listen(8080, () => {
  console.log("Backend corriendo en http://localhost:8080");
});
