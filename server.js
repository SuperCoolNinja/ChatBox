//Socket and Express integration :

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


//This allow us to add our css content :
app.use(express.static('public'));


//This allow us to be redirect to the index.html file at the / racine :
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


//This is executed once an user is on the page :
io.on('connection', (socket) => {
    console.log(`a user with id ${socket.id} connected`);


    //Let's play with our event :
    socket.on('send-message', (msg) => {
        console.log('New message receive : ' + msg);

        //This allow us to send our global message to all the client :
        socket.broadcast.emit('receive-message', msg);
    })


    //Check if the user has disconnect : 
    socket.on('disconnect', () => { console.log(`User with id ${socket.id} has been disconnected.`) })
});

server.listen(8080, () => {
    console.log('listening on *:8080');
});