// evento.controller.js
import { dbConnect } from '../config/db.js';
import jwt from 'jsonwebtoken';  // Para decodificar el token

const SECRET_KEY = 'clave_secreta';  // Asegúrate de que esta clave sea la misma que usas para firmar el token

export const crearEvento = async (req, res) => {
  const { nombre, descripcion, fechaInicio, fechaFinal, precio } = req.body;
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No se ha proporcionado un token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
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
      const decoded = jwt.verify(token, SECRET_KEY);
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

export const crearReserva = async (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.id;

  try {
    const connection = await dbConnect();

    // Obtener el precio del evento
    const sqlPrecio = `SELECT eve_precio FROM Eventos WHERE eve_id = ?`;
    const [rowsPrecio] = await connection.execute(sqlPrecio, [eventId]);
    const precioEvento = rowsPrecio[0].eve_precio;

    // Obtener el saldo del usuario
    const sqlSaldo = `SELECT usu_saldo FROM Usuarios WHERE usu_id = ?`;
    const [rowsSaldo] = await connection.execute(sqlSaldo, [userId]);
    const saldoUsuario = rowsSaldo[0].usu_saldo;

    // Verificar si el usuario tiene saldo suficiente
    if (saldoUsuario < precioEvento) {
      return res.status(400).json({ error: 'Saldo insuficiente para comprar este evento' });
    }

    // Crear la reserva
    const sqlReserva = `INSERT INTO Reservas (res_evento, res_usuario, res_fecha_compra, res_cancelada)
                        VALUES (?, ?, NOW(), 0)`;
    const valuesReserva = [eventId, userId];
    await connection.execute(sqlReserva, valuesReserva);

    // Actualizar el saldo del usuario
    const nuevoSaldo = saldoUsuario - precioEvento;
    const sqlActualizarSaldo = `UPDATE Usuarios SET usu_saldo = ? WHERE usu_id = ?`;
    await connection.execute(sqlActualizarSaldo, [nuevoSaldo, userId]);

    res.status(200).json({ message: 'Reserva creada exitosamente' });
  } catch (err) {
    console.error('Error al crear la reserva:', err);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

export const obtenerReservasUsuario = async (req, res) => {
  try {
    const userId = req.user.id; // Obtén el ID del usuario desde el token
    const connection = await dbConnect();

    const sql = `
      SELECT e.eve_nombre, e.eve_fecha_inicio, e.eve_fecha_final, r.res_fecha_compra
      FROM Reservas r
      JOIN Eventos e ON r.res_evento = e.eve_id
      WHERE r.res_usuario = ? AND r.res_cancelada = 0;
    `;
    const [rows] = await connection.execute(sql, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reservas para este usuario' });
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener las reservas del usuario:', err);
    res.status(500).json({ error: 'Error al obtener las reservas del usuario' });
  }
};

export const modificarEvento = async (req, res) => {
  const { nombre, descripcion, fechaInicio, fechaFinal, precio } = req.body;
  const { id } = req.params;

  try {
    const connection = await dbConnect();

    const sql = `
      UPDATE Eventos
      SET eve_nombre = ?, eve_descripcion = ?, eve_fecha_inicio = ?, eve_fecha_final = ?, eve_precio = ?
      WHERE eve_id = ?
    `;
    const values = [nombre, descripcion, fechaInicio, fechaFinal, precio, id];
    await connection.execute(sql, values);

    res.status(200).json({ message: 'Evento modificado exitosamente' });
  } catch (err) {
    console.error('Error al modificar el evento:', err.message);
    res.status(500).json({ error: 'Error al modificar el evento', details: err.message });
  }
};

export const eliminarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await dbConnect();

    const sql = `DELETE FROM Eventos WHERE eve_id = ?`;
    await connection.execute(sql, [id]);

    res.status(200).json({ message: 'Evento eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el evento:', err.message);
    res.status(500).json({ error: 'Error al eliminar el evento', details: err.message });
  }
};

export const filtrar = async (req, res) => {
  console.log('req.body:', req.body); // Registro del cuerpo de la solicitud
  try {
    const { nombre, fechaInicio, fechaFinal, precio } = req.body; // Desestructuración de parámetros
    const connection = await dbConnect(); // Conexión a la base de datos

    let sql = 'SELECT * FROM Eventos WHERE 1=1'; // Consulta SQL
    const params = []; // Array para almacenar parámetros de consulta

    // Filtra por nombre
    if (nombre != null && nombre != undefined) {
      sql += ' AND eve_nombre LIKE ?';
      params.push(`%${nombre}%`);
    }

    // Filtra por fecha de inicio
    if (fechaInicio != null && fechaInicio != undefined) {
      sql += ' AND eve_fecha_inicio >= ?';
      params.push(fechaInicio);
    }

    // Filtra por fecha final
    if (fechaFinal != null && fechaFinal != undefined) {
      sql += ' AND eve_fecha_final <= ?';
      params.push(fechaFinal);
    }

    // Filtra por precio
    if (precio != null && precio != undefined) {
      sql += ' AND eve_precio = ?';
      params.push(precio);
    }

    // Ejecución de la consulta
    const [rows] = await connection.execute(sql, params);

    // Verificación de resultados
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron eventos con los criterios especificados' });
    }

    res.status(200).json(rows); // Devuelve los eventos encontrados
  } catch (err) {
    console.error('Error al filtrar los eventos:', err); // Registro de errores
    res.status(500).json({ error: 'Error al filtrar los eventos' }); // Respuesta de error
  }
};
