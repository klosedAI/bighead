document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.getElementById('close-button');

    closeButton.addEventListener('click', function () {
        // Replace the chat window with the chatButton iframe
        const chatWindow = document.querySelector('.chat-window');
        chatWindow.style.display = 'none';

        // Create a new iframe for the chatButton.html
        const chatButtonIframe = document.createElement('iframe');
        chatButtonIframe.src = 'chatButton.html';
        chatButtonIframe.classList.add('chatButton-iframe');

        // Append the chatButton iframe to the body
        document.body.appendChild(chatButtonIframe);
    });
});
