const express = require("express");
const router = express.Router();
const db = require("../models/db");


router.post("/randomBags", async (req, res) => {
  try {
    const { store_id, description, total_price, discount_price, pick_up_time, available } = req.body;

    // Validaciones adicionales
    if (!store_id) {
      return res.status(400).json({ error: "store_id es requerido" });
    }
    if (isNaN(total_price) || isNaN(discount_price)) {
      return res.status(400).json({ error: "total_price y discount_price deben ser números válidos" });
    }

    const result = await db.query(
      `INSERT INTO random_bag (store_id, description, total_price, discount_price, pick_up_time, available) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [store_id, description, total_price, discount_price, pick_up_time, available]
    );
    console.log("Datos obtenidos:", result.rows); // Log para depuración
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Código de error de PostgreSQL para violación de restricción única
      res.status(400).json({ error: "El store_id ya existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get("/randomBags", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM random_bag");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/randomBags/:random_bag_id", async (req, res) => {
  try {
    const { random_bag_id } = req.params;

    // Verificar si la random_bag existe
    const checkResult = await db.query(
      "SELECT * FROM random_bag WHERE random_bag_id = $1",
      [random_bag_id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Random Bag no encontrada" });
    }

    // Eliminar la random_bag
    const result = await db.query(
      "DELETE FROM random_bag WHERE random_bag_id = $1 RETURNING *",
      [random_bag_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
