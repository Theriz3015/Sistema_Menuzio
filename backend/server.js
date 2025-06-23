import express from 'express';

import { connectDatabase } from './models/database.js';

import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import authRoute from './routes/auth.js';
import pedidoRoute from './routes/pedido.js';

const app = express();
const PORT = process.env.PORT || 9999;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://menuzio.netlify.app']
  }));

app.use(express.json());
app.use('/auth', authRoute);
app.use('/pedidos', pedidoRoute);
app.get('/', (req, res) => {
  res.send('O back está funcionando!');
});

connectDatabase();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
