// Ruta: /controllers/materialesController.js
const path = require('path');
const fs = require('fs');

const materialesPath = path.join(__dirname, '../data/materiales.json');
const lineaMaterialPath = path.join(__dirname, '../data/linea_material.json');

function obtenerMaterialesConCoste() {
  const materiales = JSON.parse(fs.readFileSync(materialesPath));
  const usos = JSON.parse(fs.readFileSync(lineaMaterialPath));

  return usos.map(uso => {
    const material = materiales.find(m => m.id === uso.idMaterial);
    if (!material) return null;

    const coste = uso.cantidad * material.costeUnitario;

    return {
      idLineaPresupuesto: uso.idLineaPresupuesto,
      idMaterial: uso.idMaterial,
      nombre: material.nombre,
      categoria: material.categoria,
      unidadMedida: material.unidadMedida,
      cantidad: uso.cantidad,
      costeUnitario: material.costeUnitario,
      costeTotal: Number(coste.toFixed(2))
    };
  }).filter(Boolean);
}

module.exports = { obtenerMaterialesConCoste };
