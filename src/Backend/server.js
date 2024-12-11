import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventoRoutes from './routes/evento.routes.js';  // Importar las rutas
import userRoutes from './routes/user.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Asegúrate de que el cuerpo de la solicitud esté en formato JSON

// Usar las rutas de eventos
app.use('/eventos', eventoRoutes); // Asegúrate de que todas las rutas en evento.routes.js estén bajo /eventos
app.use('/usuarios', userRoutes);

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
