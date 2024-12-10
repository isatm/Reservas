import { Router } from 'express';
import { dbConnect } from '../config/db.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { username, password, email, role } = req.body;

    // Validación de los datos
    if (!username || !password || !email || !role) {
      return res.status(400).send('Todos los campos son requeridos');
    }
  
    try {
      // Obtener la conexión a la base de datos
      const db = await dbConnect();
      
      // Consulta SQL para insertar el usuario
      const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
      
      // Ejecutar la consulta
      await db.execute(query, [username, password, email, role]);
      
      // Respuesta exitosa
      return res.status(201).send('Usuario registrado con éxito');
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
      return res.status(500).send('Error al registrar el usuario');
    }
  });

export default router;
