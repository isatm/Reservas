// routes/evento.routes.js

import express from 'express';
import { crearEvento, obtenerEvento } from '../controllers/evento.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/eventos', verificarToken, crearEvento);
router.get('/eventos/obtener', obtenerEvento);

export default router;
