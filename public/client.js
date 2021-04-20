const socket = io(); 
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('messages');
const userList = document.getElementById('user-list');
const roomName = document.getElementById('room-name');

// CATCH message EVENTS
socket.on('message', message => {
    outputMessageToDOM(message);

    // SCROLL DOWN AUTOMETICALLY IF THE MAXIMUM HEIGHT IS REACHED
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// ON MESSAGE SEND
chatForm.addEventListener('submit', event => {
    event.preventDefault();

    const message = event.target.elements.input.value;

    // CLEAN UP AND FOCUS ON INPUT
    event.target.elements.input.value = '';
    event.target.elements.input.focus();

    socket.emit('chat-message', message);
});

// GET USERNAME AND ROOMNAME FROM URL
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

// EMIT AN EVENT WITH USERNAME AND ROOMNAME
socket.emit('join-room', { username, room });

// CATCH join-users EVENTS
socket.on('join-users', ({ users, room }) => {
    outputUsersListToDOM(users);
    outputRoomNameToDOM(room);
});

// CREATE A NEW MESSAGE ELEMEND AND APPEND TO THE DOM
const outputMessageToDOM = message => {
    const { username, content, time } = message;

    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `
        <p class="name-date">${ username } <span>${ time }</span></p>
        <p class="message-content">${ content }</p>
    `;

    chatMessages.appendChild(newMessage);
}

const outputUsersListToDOM = users => {
    userList.innerHTML = `
        ${ users.map(user => `<li>${ user.username }</li>`).join('') }
    `;
}

const outputRoomNameToDOM = room => {
    roomName.innerText = room;
}
