const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const ruta = path.join(__dirname, '../../data/linea_material.json');

router.post('/', (req, res) => {
  const lista = JSON.parse(fs.readFileSync(ruta));
  const nuevo = {
    id: Date.now(),
    ...req.body
  };
  lista.push(nuevo);
  fs.writeFileSync(ruta, JSON.stringify(lista, null, 2));
  res.status(201).json(nuevo);
});

const { obtenerMaterialesCalculadosPorLinea } = require('../../controllers/lineaMaterialController');

// GET materiales calculados por línea
router.get('/:idLineaPresupuesto', (req, res) => {
  try {
    const calculados = obtenerMaterialesCalculadosPorLinea(req.params.idLineaPresupuesto);
    res.json(calculados);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los materiales' });
  }
});


module.exports = router;
