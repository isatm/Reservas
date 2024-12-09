// routes/evento.routes.js

import express from 'express';
import { crearEvento } from '../controllers/evento.controller.js';

const router = express.Router();

// Ruta para crear un evento
router.post('/eventos', crearEvento);

export default router;
