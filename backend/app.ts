const express = require('express');
import { Pool } from 'pg';
import cors = require("cors");
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes'
import messageRoutes from './routes/messageRoutes';
import * as http from "http";
import { Server } from 'socket.io';
import { config } from 'dotenv';

// Load .env variables
config()

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

export const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432'),
});

// Test database connection
db.connect()
    .then(() => console.log('Connected to PostgreSQL database!'))
    .catch((err) => console.error('Database connection error:', err.stack));

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
    socket.on('message', (data) => {
        io.emit('message', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
