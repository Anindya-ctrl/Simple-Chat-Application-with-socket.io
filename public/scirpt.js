const socket = io();
const chatForm = document.getElementById('chat-form');
const chat = document.querySelector('.chat-messages');

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

const outputMessageToDOM = message => {
    const newMessageElement = document.createElement('div');
    newMessageElement.classList.add('message');
    newMessageElement.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>\n<p class="text">\n${ message }\n</p>`;

    chat.appendChild(newMessageElement);
}
