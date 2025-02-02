const express = require("express");
const router = express.Router();
const db = require("../models/db");


router.post("/randomBags", async (req, res) => {
  try {
    const { store_id, description, total_price, discount_price, pick_up_time, available } = req.body;


    if (!store_id) {
      return res.status(400).json({ error: "store_id es requerido" });
    }

    const result = await db.query(
      `INSERT INTO random_bag (store_id, description, total_price, discount_price, pick_up_time, available) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [store_id, description, total_price, discount_price, pick_up_time, available]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
