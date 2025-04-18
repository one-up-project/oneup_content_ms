const express = require("express");
const cors = require("cors");
const randomBagsRouter = require("./routes/randomBags");
const ordersRouter = require("./routes/orders");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/store", randomBagsRouter);
app.use("/api/store", ordersRouter);

app.listen(5000, () => {
  console.log("Backend corriendo en http://localhost:5000");
});
