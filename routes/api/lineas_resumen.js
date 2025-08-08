const express = require('express');
const router = express.Router();
const { obtenerLineasResumen } = require('../../controllers/lineasResumenController');

router.get('/:idPresupuesto', (req, res) => {
  try {
    const resumen = obtenerLineasResumen(req.params.idPresupuesto);
    res.json(resumen);
  } catch (error) {
    console.error("Error en resumen de líneas:", error);
    res.status(500).json({ error: 'Error al obtener resumen de líneas' });
  }
});

module.exports = router;
