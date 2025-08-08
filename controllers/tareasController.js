function calcularCosteTarea(tarea) {
    const tiempoVariableTotal = tarea.tiempoVariablePorUnidad * tarea.unidades;
    const tiempoTotal = tarea.tiempoFijo + tiempoVariableTotal;
    const coste = tiempoTotal * tarea.costePorMinuto;
  
    return {
      ...tarea,
      tiempoVariableTotal,
      tiempoTotal,
      coste
    };
  }
  
  module.exports = { calcularCosteTarea };
  