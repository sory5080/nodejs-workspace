/* var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

//Chargement su socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
    //On attend le pseudo du client
    socket.on('pseudo_client', (pseudo) => {
        socket.pseudo = pseudo;
        if (socket.pseudo !== undefined) {
            console.log(socket.pseudo);
            socket.emit('pseudo_client', {
                pseudo: 'Server',
                contenu: 'Bienvenue ' + socket.pseudo + ', Vous êtes bien connecté !'
            });
            socket.broadcast.emit('message', {pseudo: 'Server', contenu: socket.pseudo + ' est connecté !'});
        }
    });
    socket.on('message', (message)=>{
        console.log(message.pseudo + ' => ' + message.contenu);
        socket.broadcast.emit('message', {pseudo: message.pseudo, contenu: message.contenu});
    });
});

server.listen(8082); */

var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

// Chargement de la page index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
});

server.listen(8082);