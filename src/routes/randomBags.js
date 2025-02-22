const express = require("express");
const router = express.Router();
const db = require("../models/db");

//reservar producto
router.post("/randomBags/reserve", async (req, res) => {
  try {
    //get params
    const { user_id, random_bag_id } = req.body;
    const result0 = await db.query(
      "select * from orders where random_bag_id = $1",
      [random_bag_id]
    );
    if (result0.rows.length > 0) {
      return res.status(400).json({ error: "La bolsa ya fue reservada" });
    }
    //query create order
    const result = await db.query(
      "insert into orders (user_id, random_bag_id, current_status) values ($1, $2, 'reserved') RETURNING *",
      [user_id, random_bag_id]
    );
    console.log("orden creada: ", result.rows);
    if (result.rows.length > 0) {
      //query update random_bag
      const result2 = await db.query(
        "update random_bag set available = false where random_bag_id = $1 RETURNING *",
        [random_bag_id]
      );
      console.log("random_bag actualizada: ", result2.rows);
      res.json(result2.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/randomBags", async (req, res) => {
  try {
    const {
      store_id,
      description,
      total_price,
      discount_price,
      pick_up_time,
      available,
    } = req.body;

    // Validaciones adicionales
    if (!store_id) {
      return res.status(400).json({ error: "store_id es requerido" });
    }
    if (isNaN(total_price) || isNaN(discount_price)) {
      return res.status(400).json({
        error: "total_price y discount_price deben ser números válidos",
      });
    }

    const result = await db.query(
      `INSERT INTO random_bag (store_id, description, total_price, discount_price, pick_up_time, available) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        store_id,
        description,
        total_price,
        discount_price,
        pick_up_time,
        available,
      ]
    );
    console.log("Datos obtenidos:", result.rows); // Log para depuración
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({ error: "El store_id ya existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get("/randomBags", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM random_bag where available = true order by created_at desc"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/randomBags/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM random_bag where random_bag_id = $1 ",
      [id]
    );
    res.json(result.rows[0]);
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
