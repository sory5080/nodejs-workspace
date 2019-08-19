var http = require('http');
var fs = require('fs');

//Chargement du fichier index.html affiché au client
var server = http.createServer((req, res) => {
    console.log('OK');
    fs.readFile('./src/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', (socket) => {
    //Reception de message par le serveur
    socket.on('pseudo', (pseudo) => {
        socket.pseudo = pseudo;
        socket.emit('bienvenu', 'Bienvenue ' + socket.pseudo + ', Vous êtes bien connecté !');
        socket.broadcast.emit('message', socket.pseudo + ' vient de se connecter !');
        console.log(socket.pseudo + ' est connecté !');
    });
    //console.log('Un client est connecté avec ID: ' + socket.client.id);
    //Envoie d'un message aux clients
    //socket.emit('message', {contenu: 'Vous êtes bien connecté !', niveau: 1});

    //Reception de message par le client
    socket.on('message', (message) => {
        console.log('Message du client: ', message);
    });
});

server.listen(8081);