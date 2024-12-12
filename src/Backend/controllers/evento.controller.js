import { dbConnect } from '../config/db.js';
import jwt from 'jsonwebtoken';  // Para decodificar el token

export const crearEvento = async (req, res) => {
  const { nombre, descripcion, fechaInicio, fechaFinal, precio } = req.body;
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'No se ha proporcionado un token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, 'tu_clave_secreta');  
    const userId = decoded.id;  

    const connection = await dbConnect();

    const sql = `
      INSERT INTO Eventos (eve_nombre, eve_descripcion, eve_fecha_inicio, eve_fecha_final, eve_precio)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [nombre, descripcion, fechaInicio, fechaFinal, precio];
    const [result] = await connection.execute(sql, values);

    const eventoId = result.insertId;

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
    const token = req.headers['authorization']?.split(' ')[1];
    let userId = null;

    if (req.query.user && token) {
      const decoded = jwt.verify(token, 'clave_secreta');  
      userId = decoded.id;
    }

    const connection = await dbConnect();

    let sql;
    let values = [];

    if (userId) {
      sql = `
        SELECT e.eve_id, e.eve_nombre, e.eve_descripcion, e.eve_precio
        FROM Eventos e
        JOIN Organizadores o ON e.eve_id = o.org_evento
        WHERE o.org_organizador = ?
      `;
      values = [userId];
    } else {
      sql = `
        SELECT e.eve_id, e.eve_nombre, e.eve_descripcion, e.eve_precio
        FROM Eventos e
      `;
    }

    const [rows] = await connection.execute(sql, values);

    if (rows.length === 0) {
      return res.status(200).json({ message: userId ? 'No hay eventos disponibles para este usuario.' : 'No hay eventos disponibles.' });
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener los eventos:', err);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};

export const obtenerEventoPorId = async (req, res) => {
  try {
    const { id } = req.params; 
    const connection = await dbConnect();

    const sql = `SELECT * FROM Eventos WHERE eve_id = ?`;
    const [rows] = await connection.execute(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error al obtener el evento:', err);
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
};