import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    pingTimeout: 60000,
    pingInterval: 25000
});

const PORTA = globalThis.process?.env?.PORT || process.env.PORT || 3000;

let usuariosConectados = {};

io.on('connection', (socket) => {

    console.log(`Usuario conectado: ${socket.id}`);
    socket.on('enviar_mensagem', (dados) => {
        console.log('Mensagem recebida:', dados);
        io.emit('receber_mensagem', dados);
    });

    socket.on('novo_usuario', (dadosUsuario) => {
        console.log(`Usuário novo registrado: @${dadosUsuario.nome_usuario}`);
    });

    socket.on('usuario_online', (dados) => {
        console.log(`Usuário logou: ${dados.nome_usuario}`);
        usuariosConectados[socket.id] = dados.nome_usuario;
        io.emit('atualizar_lista_online', usuariosConectados);
    });

    socket.on('pedir_lista_online', () => {
        socket.emit('atualizar_lista_online', usuariosConectados);
    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
        if (usuariosConectados[socket.id]){
            delete usuariosConectados[socket.id];
            io.emit('atualizar_lista_online', usuariosConectados);
        }
    });
});

httpServer.listen(PORTA, () => {
    console.log(`Server rodando na porta ${PORTA}`);
});