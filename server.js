const express = require('express');
const app = express();

const path = require('path');
const server = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

const formatMessage = require('./utilities/formatMessage');
const { onUserJoin, getCurrentUser, getAllUsersInRoom, onUserLeave } = require('./utilities/userFunctions');
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
        socket.join(user.room);

        // TO THE SINGLE CLIENT WHO CONNECTS
        socket.emit('message', formatMessage(adminName, `Welcome to Chat Applet, ${ user.username }!`));

        // TO EVERYONE EXCEPT THE CLIENT WHO JOINS
        socket.broadcast.to(user.room).emit('message', formatMessage(adminName, `${ user.username } has connected!`));

        // CATCH chat-message EVENT
        socket.on('chat-message', message => {
            const currentUser = getCurrentUser(socket.id);

            // SEND BACK TO THE CLIENT SIDE AS message EVENT
            io.to(currentUser.room).emit('message', formatMessage(currentUser.username, message));
        });
    });

    // TO EVERYONE WHEN A CLIENT DISCONNECTS
    socket.on('disconnect', () => {
        const disconnectedUser = onUserLeave(socket.id);

        disconnectedUser ? 
        io.to(disconnectedUser.room).emit('message', formatMessage(adminName, `${ disconnectedUser.username } has diconnected! :(`)) :
        
        void 0;
    });
});

server.listen(PORT, () => {
    console.log(`Server started at port: ${ PORT }`)
})
