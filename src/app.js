const express = require("express");
const cors = require("cors");
const randomBagsRoutes = require("./routes/randomBags");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/store", randomBagsRoutes); // ⚠️ La URL del API Gateway debe coincidir con esta ruta

app.listen(5000, () => {
  console.log("Backend corriendo en http://localhost:5000");
});
