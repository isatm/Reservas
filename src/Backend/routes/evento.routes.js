// routes/evento.routes.js

import express from 'express';
import { crearEvento, obtenerEvento } from '../controllers/evento.controller.js';

const router = express.Router();

router.post('/eventos', crearEvento);
router.get('/eventos/obtener', obtenerEvento);

export default router;
