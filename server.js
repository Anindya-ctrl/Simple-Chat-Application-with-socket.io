const express = require('express');
const app = express();

const path = require('path');
const http = require('http');
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

const formatMessage = require('./utilities/formatMessage');
const { onJoin, getUser, onLeave, getRoomUsers } = require('./utilities/userFunctions');
require('dotenv').config();
const adminName = 'ADMIN';

const PORT = process.env.PORT || 5000;

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// RUN WHEN CLIENT CONNECTS
io.on('connection', socket => {
    socket.on('join-room', ({ username, room }) => {
        const user = onJoin(socket.id, username, room);

        socket.join(user.room);

        // TO THE SINGLE CLIENT
        socket.emit('message', formatMessage(adminName, 'Welcome to the chat!'));

        // BROADCAST TO EVERYONE EXCEPT THE CLIENT WHO CONNECTES
        socket.broadcast.to(user.room).emit('message', formatMessage(adminName, `${ user.username } has connected!`));

        // SEND USERS AND ROOM NAME
        io.to(user.room).emit('room-users', {
            users: getRoomUsers(user.room),
            room: user.room,
        });
    });

    socket.on('chat-message', message => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, message));
    });

    socket.on('disconnect', () => {
        const user = onLeave(socket.id);

        // TO EVERYBODY
        io.to(user.room).emit('message', formatMessage(adminName, `${ user.username } has left the chat! :(`));

        io.to(user.room).emit('room-users', {
            users: getRoomUsers(user.room),
            room: user.room,
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${ PORT }`);
});
