const fs = require('fs');
const path = require('path');

const rutaUsos = path.join(__dirname, '../data/linea_material.json');
const rutaModelos = path.join(__dirname, '../data/materiales_modelo.json');

function obtenerMaterialesCalculadosPorLinea(idLineaPresupuesto) {
  const usos = JSON.parse(fs.readFileSync(rutaUsos));
  const modelos = JSON.parse(fs.readFileSync(rutaModelos));

  return usos
    .filter(u => String(u.idLineaPresupuesto) === String(idLineaPresupuesto))
    .map(uso => {
      const modelo = modelos.find(m => m.id === uso.idMaterial);
      if (!modelo) return null;

      const costeTotal = uso.cantidad * modelo.costeUnitario;

      return {
        id: uso.id,
        nombre: modelo.nombre,
        categoria: modelo.categoria,
        unidadMedida: modelo.unidadMedida,
        cantidad: uso.cantidad,
        costeUnitario: modelo.costeUnitario,
        costeTotal: parseFloat(costeTotal.toFixed(2))
      };
    })
    .filter(Boolean);
}

module.exports = { obtenerMaterialesCalculadosPorLinea };
