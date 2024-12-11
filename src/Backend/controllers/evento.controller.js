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
    const sql = `SELECT eve_id, eve_nombre, eve_descripcion, eve_precio FROM Eventos`;
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

export const obtenerEventoPorId = async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de los parámetros de la URL
    const connection = await dbConnect();

    // Consulta SQL para obtener un evento específico por ID
    const sql = `SELECT * FROM Eventos WHERE eve_id = ?`;
    const [rows] = await connection.execute(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.status(200).json(rows[0]); // Devuelve el evento encontrado
  } catch (err) {
    console.error('Error al obtener el evento:', err);
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
};

export const filtrar = async (req, res) => {
  const { nombre, ubicacion, fechaInicio, fechaFin } = req.query;

  console.log('Consulta SQL:', nombre);

  let query = 'SELECT * FROM eventos WHERE 1=1'; // Iniciar consulta
  console.log('Consulta SQL:', nombre);
  let params = [];
  
  // Filtrar por nombre
  if (nombre) {
    query += ` AND eve_nombre LIKE ?`;
    params.push(`%${nombre}%`);
  }

  // Filtrar por ubicación
  if (ubicacion) {
    query += ` AND eve_ubicacion LIKE ?`;
    params.push(`%${ubicacion}%`);
  }

  // Filtrar por fecha de inicio
  if (fechaInicio) {
    query += ` AND eve_fecha_inicio >= ?`;
    params.push(fechaInicio);
  }

  // Filtrar por fecha de fin
  if (fechaFin) {
    query += ` AND eve_fecha_fin <= ?`;
    params.push(fechaFin);
  }

  console.log('Consulta SQL:', query);  // Verifica la consulta antes de ejecutarla
  console.log('Parámetros:', params);  // Verifica los parámetros antes de la ejecución

  // Ejecutar la consulta con parámetros seguros
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ message: 'Error en la base de datos', error: err.message });
    }

    // Si no hay resultados, devolver un mensaje adecuado
    if (results.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    // Enviar los resultados
    res.json(results);
  });
};
