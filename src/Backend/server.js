import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventoRoutes from './routes/evento.routes.js'; 
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());  

app.use(eventoRoutes); 
app.use(userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
