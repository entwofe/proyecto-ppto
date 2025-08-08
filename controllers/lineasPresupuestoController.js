const path = require('path');
const fs = require('fs');

const lineasPath = path.join(__dirname, '../data/lineas_presupuesto.json');

function obtenerLineasPorPresupuesto(idPresupuesto) {
  const lineas = JSON.parse(fs.readFileSync(lineasPath));
  return lineas.filter(l => l.idPresupuesto == idPresupuesto);
}

function obtenerTodasLineas() {
  return JSON.parse(fs.readFileSync(lineasPath));
}

module.exports = { obtenerLineasPorPresupuesto, obtenerTodasLineas };
