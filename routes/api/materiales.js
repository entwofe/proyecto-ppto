// Ruta: /routes/api/materiales.js
const express = require('express');
const router = express.Router();
const { obtenerMaterialesConCoste } = require('../../controllers/materialesController');

router.get('/', (req, res) => {
  try {
    const materiales = obtenerMaterialesConCoste();
    res.json(materiales);
  } catch (error) {
    console.error('Error al obtener materiales:', error);
    res.status(500).json({ error: 'No se pudieron cargar los materiales' });
  }
});

module.exports = router;
