    // routes/evento.routes.js

    import express from 'express';
    import { crearEvento, obtenerEvento, obtenerEventoPorId, filtrar } from '../controllers/evento.controller.js';

    const router = express.Router();

    // Asegúrate de que la ruta esté correctamente definida
    router.post('/', crearEvento);
    router.get('/obtener', obtenerEvento);
    router.get('/:id', obtenerEventoPorId);
    router.get('/filtrar', filtrar); // Ruta correcta para filtrar eventos por fechas

    export default router;