const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Crear una nueva random bag
router.post("/randomBags", async (req, res) => {
  try {
    const { store_id, username, description, total_price, discount_price, pick_up_time, available } = req.body;

    // Validar que los campos numéricos sean válidos
    if (isNaN(total_price) || isNaN(discount_price)) {
      return res.status(400).json({ error: "total_price y discount_price deben ser números válidos" });
    }

    // Insertar la nueva random bag en la base de datos
    const result = await db.query(
      `INSERT INTO random_bag (store_id, username, description, total_price, discount_price, pick_up_time, available) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [store_id, username, description, total_price, discount_price, pick_up_time, available]
    );

    // Devolver la random bag creada
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear la random bag:", err);
    res.status(500).json({ error: "Error interno del servidor al crear la random bag." });
  }
});

// Obtener todas las random bags (opcionalmente filtradas por store_id)
router.get("/randomBags", async (req, res) => {
  try {
    const { store_id } = req.query;

    let query = "SELECT * FROM random_bag";
    let params = [];

    if (store_id) {
      query += " WHERE store_id = $1";
      params.push(store_id);
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener random bags:", err);
    res.status(500).json({ error: "Error interno del servidor al obtener random bags." });
  }
});

// Eliminar una random bag por su ID
router.delete("/randomBags/:random_bag_id", async (req, res) => {
  try {
    const { random_bag_id } = req.params;

    const result = await db.query(
      "DELETE FROM random_bag WHERE random_bag_id = $1 RETURNING *",
      [random_bag_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Random Bag no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al eliminar la random bag:", err);
    res.status(500).json({ error: "Error interno del servidor al eliminar la random bag." });
  }
});
router.put("/randomBags/:random_bag_id", async (req, res) => {
  try {
    const { random_bag_id } = req.params;
    console.log("ID recibido para actualizar:", random_bag_id); // Depuración

    const { store_id, username, description, total_price, discount_price, pick_up_time, available } = req.body;

    // Validar que los campos numéricos sean válidos
    if (isNaN(total_price) || isNaN(discount_price)) {
      return res.status(400).json({ error: "total_price y discount_price deben ser números válidos" });
    }

    // Actualizar la random bag en la base de datos
    const result = await db.query(
      `UPDATE random_bag 
       SET store_id = $1, username = $2, description = $3, total_price = $4, discount_price = $5, pick_up_time = $6, available = $7
       WHERE random_bag_id = $8
       RETURNING *`,
      [store_id, username, description, total_price, discount_price, pick_up_time, available, random_bag_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Random Bag no encontrada" });
    }

    // Devolver la random bag actualizada
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar la random bag:", err);
    res.status(500).json({ error: "Error interno del servidor al actualizar la random bag." });
  }
});

module.exports = router;