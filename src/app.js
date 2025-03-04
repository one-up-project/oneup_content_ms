const express = require("express");
const cors = require("cors");
const randomBagsRouter = require("./routes/randomBags");
const ordersRouter = require("./routes/orders");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*", // Permite solicitudes desde este origen
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permite los métodos HTTP necesarios
    credentials: true, // Permite el envío de cookies y encabezados de autorización
  })
);

app.use(express.json());

app.use("/api/store", randomBagsRouter);
app.use("/api/store", ordersRouter);

const PORT = process.env.PORT;
// console.log(PORT);
app.listen(PORT, () => {
  console.log("Backend corriendo en puerto", PORT);
});
