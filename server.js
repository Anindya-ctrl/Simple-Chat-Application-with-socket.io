const express = require('express');
const app = express();

const path = require('path');
const http = require('http');
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// RUN WHEN CLIENT CONNECTS
io.on('connection', socket => {
    // TO THE SINGLE CLIENT
    socket.emit('message', 'Welcome to the chat!');

    // BROADCAST WHEN AN USER CONNECTS ( TO ALL USERS EXCEPT THE CLIENT WHO CONNECTES )
    socket.broadcast.emit('message', 'A new user has connected!');

    socket.on('disconnect', () => {
        // TO EVERYBODY
        io.emit('message', 'A user has left the chat! :(');
    });

    socket.on('chat-message', message => {
        io.emit('message', message);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${ PORT }`);
});
