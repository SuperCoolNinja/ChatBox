let socket = io();

//Let's work on the Send message button function : 
function RequestSendMessage(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        SendMessage();
    }
}

function SendMessage() {
    const message = document.getElementById('typing-box');

    if (!message.value) return;

    const html = '<div class="my-message">' + message.value + '</div>' + '<div class="separator"></div>';
    document.querySelector('.message-area').innerHTML += html;

    //Let's send an event to the server to let know the user message and share it for other users : 
    socket.emit('send-message', message.value);

    message.value = "";
}


//Let's register a client event : 
socket.on('receive-message', (msg) => {
    const html = '<div class="others-message">' + msg + '</div>' + '<div class="separator"></div>';
    document.querySelector('.message-area').innerHTML += html;
})