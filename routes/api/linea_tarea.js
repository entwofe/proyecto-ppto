const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, '../../data/linea_tarea.json');

router.post('/', (req, res) => {
  try {
    const lista = JSON.parse(fs.readFileSync(ruta));
    const nuevo = {
      id: Date.now(),
      ...req.body
    };
    lista.push(nuevo);
    fs.writeFileSync(ruta, JSON.stringify(lista, null, 2));
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al guardar uso de tarea:', error);
    res.status(500).json({ error: 'Error al guardar' });
  }
});

router.get('/', (req, res) => {
  try {
    const lista = JSON.parse(fs.readFileSync(ruta));
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener' });
  }
});

const { obtenerTareasCalculadasPorLinea } = require('../../controllers/lineaTareaController');

// GET calculado por línea
router.get('/:idLineaPresupuesto', (req, res) => {
  try {
    const calculadas = obtenerTareasCalculadasPorLinea(req.params.idLineaPresupuesto);
    res.json(calculadas);
  } catch (error) {
    console.error('Error al calcular tareas:', error);
    res.status(500).json({ error: 'No se pudieron obtener las tareas calculadas' });
  }
});


module.exports = router;
