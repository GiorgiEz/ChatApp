"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var express_1 = require("express");
var promise_1 = require("mysql2/promise");
var cors_1 = require("cors");
var userRoutes_1 = require("./routes/userRoutes");
var roomRoutes_1 = require("./routes/roomRoutes");
var messageRoutes_1 = require("./routes/messageRoutes");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
exports.db = promise_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat_app',
});
app.use('/users', userRoutes_1.default);
app.use('/rooms', roomRoutes_1.default);
app.use('/messages', messageRoutes_1.default);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', function (socket) {
    socket.on('message', function (data) {
        io.emit('message', data);
    });
});
var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
