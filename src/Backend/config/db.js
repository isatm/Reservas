import mysql from 'mysql2/promise';

// Función para conectar a la base de datos
export const dbConnect = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'tabo022124',
      database: 'reservas',
    });
    console.log('Conexión establecida con la base de datos.');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    throw error; // Lanzamos el error para que se pueda manejar en server.js
  }
};
