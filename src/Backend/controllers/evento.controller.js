// controllers/evento.controller.js

import { dbConnect } from '../config/db.js';

export const crearEvento = async (req, res) => {
  const { nombre, descripcion, fechaInicio, fechaFinal, precio, imagen } = req.body;

  try {
    // Conectar a la base de datos
    const connection = await dbConnect();

    // Consulta SQL para insertar el evento
    const sql = `
      INSERT INTO Eventos (eve_nombre, eve_descripcion, eve_fecha_inicio, eve_fecha_final, eve_precio, eve_image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nombre, descripcion, fechaInicio, fechaFinal, precio, imagen];
    const [result] = await connection.execute(sql, values);

    res.status(200).json({ message: 'Evento creado exitosamente', id: result.insertId });
  } catch (err) {
    console.error('Error al insertar el evento:', err);
    res.status(500).json({ error: 'Error al insertar el evento' });
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
