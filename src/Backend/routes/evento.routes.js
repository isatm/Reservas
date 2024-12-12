// routes/evento.routes.js

import express from 'express';
import { crearEvento, obtenerEvento, obtenerEventoPorId, filtrar } from '../controllers/evento.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/eventos', verificarToken, crearEvento);
router.get('/eventos/obtener', obtenerEvento);
router.get('/eventos/:id', obtenerEventoPorId);
router.post('/eventos/filter',filtrar);

export default router;
