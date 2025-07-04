import express from 'express';
import Config from './core/Config';
import api from './routes/api';

const server = express();

server.use(express.json());
server.use("/api", api);

const PORT = Config.get("SERVER_PORT");

server.listen(PORT, () => {
    console.log("Servidor iniciado com sucesso");
})