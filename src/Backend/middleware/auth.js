import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_clave_secreta'; // La misma clave que usas para firmar el token

// Middleware para verificar el token
export const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Almacenar la información decodificada en `req.user`
    next(); // Llamar al siguiente middleware o función
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
