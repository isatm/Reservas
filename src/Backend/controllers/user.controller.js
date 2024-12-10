// controllers/evento.controller.js

import { dbConnect } from '../config/db.js';

export const crearUsuario = async (req, res) => {
  const { username, password, correo, role} = req.body;

  try {
    // Conectar a la base de datos
    const connection = await dbConnect();

    // Consulta SQL para insertar el evento
    const sql = `
      INSERT INTO Usuarios (usu_nombre, usu_contrasena, usu_correo, usu_saldo, usu_rol)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [username, password, correo, 0, role];
    const [result] = await connection.execute(sql, values);

    res.status(200).json({ message: 'Usuario creado exitosamente', id: result.insertId });
  } catch (err) {
    console.error('Error al insertar el usuario:', err);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
};
