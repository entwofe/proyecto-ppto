const fs = require('fs');
const path = require('path');

const rutaLineas = path.join(__dirname, '../data/linea_tarea.json');
const rutaModelos = path.join(__dirname, '../data/tareas_modelo.json');

function obtenerTareasCalculadasPorLinea(idLineaPresupuesto) {
  const usos = JSON.parse(fs.readFileSync(rutaLineas));
  const modelos = JSON.parse(fs.readFileSync(rutaModelos));

  return usos
    .filter(u => String(u.idLineaPresupuesto) === String(idLineaPresupuesto))
    .map(uso => {
      const modelo = modelos.find(m => m.id === uso.idTareaModelo);
      if (!modelo) return null;

      const tiempoVariableTotal = uso.unidades * modelo.tiempoVariablePorUnidad;
      const tiempoTotal = modelo.tiempoFijo + tiempoVariableTotal;
      const coste = tiempoTotal * modelo.costePorMinuto;

      return {
        id: uso.id,
        descripcion: modelo.descripcion,
        departamento: modelo.departamento,
        tiempoFijo: modelo.tiempoFijo,
        tiempoVariablePorUnidad: modelo.tiempoVariablePorUnidad,
        unidades: uso.unidades,
        tiempoTotal,
        coste: parseFloat(coste.toFixed(2))
      };
    })
    .filter(Boolean);
}

module.exports = { obtenerTareasCalculadasPorLinea };
