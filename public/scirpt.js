const socket = io();
// const outputMessageToDOM = require('../utilities/outputMessage');
const chatForm = document.getElementById('chat-form');
const chat = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

socket.on('message', message => {
    console.log(message);
    outputMessageToDOM(message);

    chat.scrollTop = chat.scrollHeight;
});

chatForm.addEventListener('submit', event => {
    event.preventDefault();
    let message = event.target.elements.msg.value;
    
    socket.emit('chat-message', message);
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
});

// GET USERNAME AND ROOM FROM URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

// JOIN ROOM WITH USERNAME AND ROOM NAME
socket.emit('join-room', { username, room });

// GET ROOM AND USERS
socket.on('room-users', ({ users, room }) => {
    outputUsersListToDOM(users);
    outputRoomNameToDOM(room);
});

const outputMessageToDOM = message => {
    const newMessageElement = document.createElement('div');
    newMessageElement.classList.add('message');
    newMessageElement.innerHTML = `<p class="meta">${ message.username } <span>${ message.time }</span></p><p class="text">${ message.message }</p>`;

    chat.appendChild(newMessageElement);
}

const outputUsersListToDOM = users => {
    userList.innerHTML = `
        ${ users.map(user => `<li>${ user.username }</li>`).join('') }
    `;
}

const outputRoomNameToDOM = room => {
    roomName.innerText = room;
}
