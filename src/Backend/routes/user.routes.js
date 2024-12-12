// user.routes.js
import express from 'express';
import { crearUsuario, iniciarSesion, obtenerSaldo, actualizarSaldo } from '../controllers/user.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// Ruta para crear un usuario
router.post('/users', crearUsuario);
router.post('/users/login', iniciarSesion);

// Rutas protegidas para obtener y actualizar el saldo
router.get('/users/saldo', verificarToken, obtenerSaldo);
router.post('/users/saldo', verificarToken, actualizarSaldo);

export default router;
