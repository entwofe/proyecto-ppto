const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Rutas a archivos
const rutaLineas = path.join(__dirname, '../../data/lineas_presupuesto.json');
const rutaTareas = path.join(__dirname, '../../data/linea_tarea.json');
const rutaMateriales = path.join(__dirname, '../../data/linea_material.json');

// 🗑 ELIMINAR línea
router.delete('/:idLinea', (req, res) => {
  const id = String(req.params.idLinea);

  const lineas = JSON.parse(fs.readFileSync(rutaLineas));
  const tareas = JSON.parse(fs.readFileSync(rutaTareas));
  const materiales = JSON.parse(fs.readFileSync(rutaMateriales));

  const nuevasLineas = lineas.filter(l => String(l.id) !== id);
  const nuevasTareas = tareas.filter(t => String(t.idLineaPresupuesto) !== id);
  const nuevosMateriales = materiales.filter(m => String(m.idLineaPresupuesto) !== id);

  fs.writeFileSync(rutaLineas, JSON.stringify(nuevasLineas, null, 2));
  fs.writeFileSync(rutaTareas, JSON.stringify(nuevasTareas, null, 2));
  fs.writeFileSync(rutaMateriales, JSON.stringify(nuevosMateriales, null, 2));

  res.status(200).json({ mensaje: 'Línea eliminada correctamente' });
});

// 📄 DUPLICAR línea
router.post('/duplicar/:idLinea', (req, res) => {
  const idOriginal = String(req.params.idLinea);
  const nuevasLineas = JSON.parse(fs.readFileSync(rutaLineas));
  const tareas = JSON.parse(fs.readFileSync(rutaTareas));
  const materiales = JSON.parse(fs.readFileSync(rutaMateriales));

  const lineaOriginal = nuevasLineas.find(l => String(l.id) === idOriginal);
  if (!lineaOriginal) return res.status(404).json({ error: 'Línea no encontrada' });

  const nuevaId = Date.now();
  const lineaDuplicada = { ...lineaOriginal, id: nuevaId, titulo: lineaOriginal.titulo + ' (copia)' };

  // Copiar tareas
  const tareasDuplicadas = tareas
    .filter(t => String(t.idLineaPresupuesto) === idOriginal)
    .map(t => ({ ...t, id: Date.now() + Math.floor(Math.random() * 1000), idLineaPresupuesto: nuevaId }));

  // Copiar materiales
  const materialesDuplicados = materiales
    .filter(m => String(m.idLineaPresupuesto) === idOriginal)
    .map(m => ({ ...m, id: Date.now() + Math.floor(Math.random() * 1000), idLineaPresupuesto: nuevaId }));

  nuevasLineas.push(lineaDuplicada);
  const nuevasTareas = [...tareas, ...tareasDuplicadas];
  const nuevosMateriales = [...materiales, ...materialesDuplicados];

  fs.writeFileSync(rutaLineas, JSON.stringify(nuevasLineas, null, 2));
  fs.writeFileSync(rutaTareas, JSON.stringify(nuevasTareas, null, 2));
  fs.writeFileSync(rutaMateriales, JSON.stringify(nuevosMateriales, null, 2));

  res.status(201).json({ mensaje: 'Línea duplicada correctamente' });
});

module.exports = router;
