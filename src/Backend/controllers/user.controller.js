import bcrypt from 'bcrypt';
import { dbConnect } from '../config/db.js';

export const crearUsuario = async (req, res) => {
  const { username, password, correo, role } = req.body;

  try {
    // Conectar a la base de datos
    const connection = await dbConnect();

    // Encriptar la contraseña antes de guardarla
    const saltRounds = 10; // Determina la cantidad de rondas de sal (cuanto más alto, más seguro, pero más lento)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Consulta SQL para insertar el usuario
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
    // Conectar a la base de datos
    const connection = await dbConnect();

    // Consulta SQL para buscar el usuario por nombre de usuario
    const sql = `SELECT usu_nombre, usu_contrasena FROM Usuarios WHERE usu_nombre = ?`;
    const [rows] = await connection.execute(sql, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = rows[0];

    // Comparar la contraseña ingresada con la contraseña encriptada en la base de datos
    const isMatch = await bcrypt.compare(password, user.usu_contrasena);

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
