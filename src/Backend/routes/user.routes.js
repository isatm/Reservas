// routes/evento.routes.js

import express from 'express';
import { crearUsuario } from '../controllers/user.controller.js';
import { iniciarSesion } from '../controllers/user.controller.js';

const router = express.Router();

// Ruta para crear un usuario
router.post('/users', crearUsuario);
router.post('/users/login', iniciarSesion);

export default router;