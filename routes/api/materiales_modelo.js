const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, '../../data/materiales_modelo.json');

router.get('/', (req, res) => {
  try {
    const materiales = JSON.parse(fs.readFileSync(ruta));
    res.json(materiales);
  } catch (error) {
    console.error('Error al cargar materiales modelo:', error);
    res.status(500).json({ error: 'No se pudieron cargar los materiales modelo' });
  }
});

module.exports = router;
