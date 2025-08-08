const express = require('express');
const path = require('path');
const app = express();

// Middleware para parsear JSON si fuera necesario más adelante
app.use(express.json());

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/tareas', require('./routes/api/tareas'));
app.use('/api/tareas_modelo', require('./routes/api/tareas_modelo'));
app.use('/api/materiales', require('./routes/api/materiales'));
app.use('/api/materiales_modelo', require('./routes/api/materiales_modelo'));
app.use('/api/presupuestos', require('./routes/api/presupuestos'));
app.use('/api/lineas_presupuesto', require('./routes/api/lineas_presupuesto'));
app.use('/api/linea_material', require('./routes/api/linea_material'));
app.use('/api/linea_tarea', require('./routes/api/linea_tarea'));
app.use('/api/lineas_resumen', require('./routes/api/lineas_resumen'));
app.use('/api/lineas_acciones', require('./routes/api/lineas_acciones'));
app.use('/api/clientes', require('./routes/api/clientes'));





// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
