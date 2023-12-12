import express from 'express';
import mysql from 'mysql2/promise';
import cors from "cors";

import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes'
import messageRoutes from './routes/messageRoutes';

import http from "http";
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat_app',
})

app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.use('/messages', messageRoutes);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (data) => {
        io.emit('message', data);
        console.log(data)
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
