const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('messages');

// CATCH message EVENTS
socket.on('message', message => {
    // console.log(message);
    outputMessageToDOM(message);
});

// ON MESSAGE SEND
chatForm.addEventListener('submit', event => {
    event.preventDefault();

    const message = event.target.elements.input.value;

    event.target.elements.input.value = '';
    event.target.elements.input.focus();

    socket.emit('chat-message', message);
});

const outputMessageToDOM = message => {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `
        <p class="name-date">John <span>12:00pm</span></p>
        <p class="message-content">${ message }</p>
    `;

    chatMessages.appendChild(newMessage);
}
