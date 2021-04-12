const express = require('express');
const app = express();

const path = require('path');
const server = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

const formatMessage = require('./utilities/formatMessage');
const { onUserJoin, getCurrentUser } = require('./utilities/userFunctions');
require('dotenv').config();
const adminName = 'ADMIN';

const PORT = process.env.PORT || 5000;

// SET STATIC FOLDER
const STATIC_FOLDER = path.join(__dirname, 'public');
app.use(express.static(STATIC_FOLDER));

// WHEN CLIENT CONNECTS
io.on('connection', socket => {
    socket.on('join-room', ({ username, room }) => {
        const user = onUserJoin(socket.id, username, room);

        // TO THE SINGLE CLIENT WHO CONNECTS
        socket.emit('message', formatMessage(adminName, 'Welcome to Chat Applet!'));

        // TO EVERYONE EXCEPT THE CLIENT WHO JOINS
        socket.broadcast.emit('message', formatMessage(adminName, 'A new user has connected!'));

        // CATCH chat-message EVENT
        socket.on('chat-message', message => {
            // SEND BACK TO THE CLIENT SIDE AS message EVENT
            io.emit('message', formatMessage(user.username, message));
        });
    });

    // TO EVERYONE WHEN A CLIENT DISCONNECTS
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(adminName, 'An user has diconnected! :('));
    });
});

server.listen(PORT, () => {
    console.log(`Server started at port: ${ PORT }`)
})
