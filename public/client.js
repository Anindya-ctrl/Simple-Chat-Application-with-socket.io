const socket = io();
const chatForm = document.getElementById('chat-form');

socket.on('message', message => {
    console.log(message);
});

chatForm.addEventListener('submit', event => {
    event.preventDefault();

    const message = event.target.elements.input.value;
    console.log(message);

    event.target.elements.input.value = '';
    event.target.elements.input.focus();
});
