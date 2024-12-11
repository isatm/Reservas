import { dbConnect } from '../config/db.js';
import jwt from 'jsonwebtoken';  // Para decodificar el token

export const crearEvento = async (req, res) => {
  const { nombre, descripcion, fechaInicio, fechaFinal, precio } = req.body;
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(401).json({ error: 'No se ha proporcionado un token de autenticación' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'tu_clave_secreta');  // 'mi_secreto' es la clave que usas para firmar el token
    const userId = decoded.id;  // Suponiendo que el id del usuario está en el payload del token

    // Conectar a la base de datos
    const connection = await dbConnect();

    // Consulta SQL para insertar el evento
    const sql = `
      INSERT INTO Eventos (eve_nombre, eve_descripcion, eve_fecha_inicio, eve_fecha_final, eve_precio)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [nombre, descripcion, fechaInicio, fechaFinal, precio];
    const [result] = await connection.execute(sql, values);

    const eventoId = result.insertId;

    // Insertar el organizador (usuario que creó el evento) en la tabla intermedia Organizadores
    const sqlOrganizador = `
      INSERT INTO Organizadores (org_evento, org_organizador)
      VALUES (?, ?)
    `;
    await connection.execute(sqlOrganizador, [eventoId, userId]);

    res.status(200).json({ message: 'Evento creado exitosamente', id: eventoId });
  } catch (err) {
    console.error('Error al insertar el evento:', err.message);
    res.status(500).json({ error: 'Error al insertar el evento', details: err.message });
  }
};

export const obtenerEvento = async (req, res) => {
  try {
    // Conectar a la base de datos
    const connection = await dbConnect();

    // Consulta SQL para obtener todos los eventos
    const sql = `SELECT eve_nombre, eve_descripcion FROM Eventos`;
    const [rows] = await connection.execute(sql);
    if (rows.length === 0) {
      return res.status(200).json({ message: 'No hay eventos disponibles.' });
    }
    // Enviar los eventos como respuesta
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener los eventos:', err);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};
