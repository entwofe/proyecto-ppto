const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const { calcularCosteTarea } = require('../../controllers/tareasController');

const tareasPath = path.join(__dirname, '../../data/tareas.json');

// GET /api/tareas → devuelve tareas con cálculo incluido
router.get('/', (req, res) => {
  try {
    const tareasRaw = fs.readFileSync(tareasPath);
    const tareas = JSON.parse(tareasRaw);
    const tareasCalculadas = tareas.map(calcularCosteTarea);
    res.json(tareasCalculadas);
  } catch (err) {
    console.error('Error al leer tareas.json:', err);
    res.status(500).json({ error: 'Error al cargar las tareas' });
  }
});

router.post('/', (req, res) => {
  const tareasPath = path.join(__dirname, '../../data/tareas.json');
  const tareas = JSON.parse(fs.readFileSync(tareasPath));
  const nueva = {
    id: Date.now(),
    ...req.body
  };
  tareas.push(nueva);
  fs.writeFileSync(tareasPath, JSON.stringify(tareas, null, 2));
  res.status(201).json(nueva);
});


module.exports = router;
