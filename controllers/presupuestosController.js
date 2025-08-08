const path = require('path');
const fs = require('fs');

const presupuestosPath = path.join(__dirname, '../data/presupuestos.json');

function obtenerPresupuestos() {
  return JSON.parse(fs.readFileSync(presupuestosPath));
}

module.exports = { obtenerPresupuestos };
