const express = require('express');
const app = express();

const path = require('path');
const server = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// SET STATIC FOLDER
const STATIC_FOLDER = path.join(__dirname, 'public');
app.use(express.static(STATIC_FOLDER));

// WHEN CLIENT CONNECTS
io.on('connection', socket => {

    // TO THE SINGLE CLIENT WHO CONNECTS
    socket.emit('message', 'Welcome to Chat Applet!');

    // TO EVERYONE EXCEPT THE CLIENT WHO JOINS
    socket.broadcast.emit('message', 'A new user has connected!');

    // TO EVERYONE WHEN A CLIENT DISCONNECTS
    socket.on('disconnect', () => {
        io.emit('message', 'An user has diconnected! :(');
    });

    // CATCH chat-message EVENT
    socket.on('chat-message', message => {
        // SEND BACK TO THE CLIENT SIDE AS message EVENT
        io.emit('message', message);
    });
});

server.listen(PORT, () => {
    console.log(`Server started at port: ${ PORT }`)
})
