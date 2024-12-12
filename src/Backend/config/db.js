import mysql from 'mysql2/promise';

export const dbConnect = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'ingeniero',
      password: 'hola123',
      database: 'reservas',
    });
    console.log('Conexión establecida con la base de datos.');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    throw error; 
  }
};