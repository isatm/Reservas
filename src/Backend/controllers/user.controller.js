// user.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { dbConnect } from '../config/db.js';

const SECRET_KEY = 'clave_secreta';

export const crearUsuario = async (req, res) => {
  const { username, password, correo, role } = req.body;

  try {
    const connection = await dbConnect();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql =
      `INSERT INTO Usuarios (usu_nombre, usu_contrasena, usu_correo, usu_saldo, usu_rol)
      VALUES (?, ?, ?, ?, ?)`;
    const values = [username, hashedPassword, correo, 0, role];
    const [result] = await connection.execute(sql, values);

    res.status(200).json({ message: 'Usuario creado exitosamente', id: result.insertId });
  } catch (err) {
    console.error('Error al insertar el usuario:', err);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
};

export const iniciarSesion = async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await dbConnect();

    const sql = `SELECT usu_id, usu_nombre, usu_contrasena FROM Usuarios WHERE usu_nombre = ?`;
    const [rows] = await connection.execute(sql, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.usu_contrasena);

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.usu_id, username: user.usu_nombre },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token,
    });

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const obtenerSaldo = async (req, res) => {
  const userId = req.user.id;

  try {
    const connection = await dbConnect();

    const sql = `SELECT usu_saldo FROM Usuarios WHERE usu_id = ?`;
    const [rows] = await connection.execute(sql, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ saldo: rows[0].usu_saldo });
  } catch (err) {
    console.error('Error al obtener el saldo:', err);
    res.status(500).json({ error: 'Error al obtener el saldo' });
  }
};

export const actualizarSaldo = async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;

  try {
    const connection = await dbConnect();

    const sql = `UPDATE Usuarios SET usu_saldo = usu_saldo + ? WHERE usu_id = ?`;
    const values = [amount, userId];
    await connection.execute(sql, values);

    res.status(200).json({ message: 'Saldo actualizado' });
  } catch (err) {
    console.error('Error al actualizar el saldo:', err);
    res.status(500).json({ error: 'Error al actualizar el saldo' });
  }
};

