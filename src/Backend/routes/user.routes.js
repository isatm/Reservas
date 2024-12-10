// routes/evento.routes.js

import express from 'express';
import { crearUsuario } from '../controllers/user.controller.js';

const router = express.Router();

// Ruta para crear un evento
router.post('/users', crearUsuario);

export default router;