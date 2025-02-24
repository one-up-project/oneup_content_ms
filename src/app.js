const express = require("express");
const cors = require("cors");
const randomBagsRouter = require("./routes/randomBags");
const ordersRouter = require("./routes/orders");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/store", randomBagsRouter);
app.use("/api/store", ordersRouter);

const PORT = process.env.PORT;
// console.log(PORT);
app.listen(PORT, () => {
  console.log("Backend corriendo en puerto", PORT);
});
