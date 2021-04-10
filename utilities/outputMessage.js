const outputMessageToDOM = message => {
    const newMessageElement = document.createElement('div');
    newMessageElement.classList.add('message');
    newMessageElement.innerHTML = `<p class="meta">${ message.username } <span>${ message.time }</span></p><p class="text">${ message.message }</p>`;

    chat.appendChild(newMessageElement);
}

module.exports = outputMessageToDOM;
