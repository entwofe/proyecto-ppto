const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, '../../data/tareas_modelo.json');

router.get('/', (req, res) => {
  try {
    const tareas = JSON.parse(fs.readFileSync(ruta));
    res.json(tareas);
  } catch (error) {
    console.error('Error al cargar tareas modelo:', error);
    res.status(500).json({ error: 'No se pudieron cargar las tareas modelo' });
  }
});

module.exports = router;
