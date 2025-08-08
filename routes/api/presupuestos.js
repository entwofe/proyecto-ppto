const express = require('express');
const router = express.Router();
const { obtenerPresupuestos } = require('../../controllers/presupuestosController');

router.get('/', (req, res) => {
  try {
    const presupuestos = obtenerPresupuestos();
    res.json(presupuestos);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar los presupuestos' });
  }
});

const path = require('path');
const fs = require('fs');
const rutaPresupuestos = path.join(__dirname, '../../data/presupuestos.json');

// POST → Crear nuevo presupuesto
router.post('/', (req, res) => {
  try {
    const { idCliente } = req.body;
    if (!idCliente) return res.status(400).json({ error: 'Falta idCliente' });

    const lista = JSON.parse(fs.readFileSync(rutaPresupuestos));
    const nuevo = {
      id: Date.now(),
      idCliente: parseInt(idCliente),
      fecha: new Date().toISOString().split('T')[0],
      estado: 'en edición'
    };

    lista.push(nuevo);
    fs.writeFileSync(rutaPresupuestos, JSON.stringify(lista, null, 2));
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear presupuesto:', error);
    res.status(500).json({ error: 'No se pudo guardar el presupuesto' });
  }
});


module.exports = router;
