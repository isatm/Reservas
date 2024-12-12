import jwt from 'jsonwebtoken';

const SECRET_KEY = 'clave_secreta'; 

// Middleware para verificar el token
export const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
