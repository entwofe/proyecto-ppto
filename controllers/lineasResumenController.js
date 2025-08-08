const fs = require('fs');
const path = require('path');

const rutaLineas = path.join(__dirname, '../data/lineas_presupuesto.json');
const rutaTareas = path.join(__dirname, '../data/linea_tarea.json');
const rutaTareasModelo = path.join(__dirname, '../data/tareas_modelo.json');
const rutaMateriales = path.join(__dirname, '../data/linea_material.json');
const rutaMaterialesModelo = path.join(__dirname, '../data/materiales_modelo.json');

function obtenerLineasResumen(idPresupuesto) {
  const lineas = JSON.parse(fs.readFileSync(rutaLineas))
    .filter(l => String(l.idPresupuesto) === String(idPresupuesto));

  const usosTarea = JSON.parse(fs.readFileSync(rutaTareas));
  const tareasModelo = JSON.parse(fs.readFileSync(rutaTareasModelo));
  const usosMaterial = JSON.parse(fs.readFileSync(rutaMateriales));
  const materialesModelo = JSON.parse(fs.readFileSync(rutaMaterialesModelo));

  return lineas.map(linea => {
    const tareasDeLinea = usosTarea.filter(t => String(t.idLineaPresupuesto) === String(linea.id));
    const materialesDeLinea = usosMaterial.filter(m => String(m.idLineaPresupuesto) === String(linea.id));

    const costeTareas = tareasDeLinea.reduce((total, uso) => {
      const modelo = tareasModelo.find(t => t.id === uso.idTareaModelo);
      if (!modelo) return total;

      const unidades = uso.unidades || 0;
      const tiempoTotal = modelo.tiempoFijo + (modelo.tiempoVariablePorUnidad * unidades);
      const coste = tiempoTotal * modelo.costePorMinuto;

      return total + coste;
    }, 0);

    const costeMateriales = materialesDeLinea.reduce((total, uso) => {
      const modelo = materialesModelo.find(m => m.id === uso.idMaterial);
      if (!modelo) return total;

      const cantidad = uso.cantidad || 0;
      const coste = cantidad * modelo.costeUnitario;

      return total + coste;
    }, 0);

    return {
      ...linea,
      costeTotal: parseFloat((costeTareas + costeMateriales).toFixed(2))
    };
  });
}

module.exports = { obtenerLineasResumen };
