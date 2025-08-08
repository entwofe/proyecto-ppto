const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const ruta = path.join(__dirname, '../../data/clientes.json');

router.get('/', (req, res) => {
  try {
    const clientes = JSON.parse(fs.readFileSync(ruta));
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar clientes' });
  }
});

module.exports = router;
