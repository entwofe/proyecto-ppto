const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const { obtenerLineasPorPresupuesto, obtenerTodasLineas } = require('../../controllers/lineasPresupuestoController');
const lineasPath = path.join(__dirname, '../../data/lineas_presupuesto.json');

// GET all
router.get('/', (req, res) => {
  try {
    const lineas = obtenerTodasLineas();
    res.json(lineas);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar las líneas' });
  }
});

// GET by presupuesto
router.get('/:idPresupuesto', (req, res) => {
  try {
    const id = req.params.idPresupuesto;
    const lineas = obtenerLineasPorPresupuesto(id);
    res.json(lineas);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar las líneas' });
  }
});

// POST para crear nueva línea
router.post('/', (req, res) => {
  try {
    const { idPresupuesto, titulo, descripcion } = req.body;

    const lineas = JSON.parse(fs.readFileSync(lineasPath));
    const nuevaLinea = {
      id: Date.now(),
      idPresupuesto,
      titulo,
      descripcion
    };

    lineas.push(nuevaLinea);
    fs.writeFileSync(lineasPath, JSON.stringify(lineas, null, 2));

    res.status(201).json(nuevaLinea);
  } catch (error) {
    console.error("Error al crear nueva línea:", error);
    res.status(500).json({ error: 'No se pudo crear la línea' });
  }
});

module.exports = router;
