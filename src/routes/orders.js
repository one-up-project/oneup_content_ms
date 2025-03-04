const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/orders/get-orders-by-store/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "select * from orders where orders.random_bag_id in (select random_bag_id  from random_bag where random_bag_id  in (select orders.random_bag_id  from orders) and store_id = $1)",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/orders/get-orders-by-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM orders WHERE user_id = $1", [
      id,
    ]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/orders/update-order-status", async (req, res) => {
  const { order_id, status } = req.body;
  if (status == null || status == "null") {
    status = "Rejected";
  }
  try {
    const result = await db.query(
      "UPDATE orders SET current_status = $1 WHERE order_id = $2",
      [status, order_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
