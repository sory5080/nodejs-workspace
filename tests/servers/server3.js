var EventEmitter = require('events').EventEmitter;

var jeu = new EventEmitter();

jeu.on('gameover', (message, nom) => {console.log(message + ' ' + nom)});

jeu.emit('gameover', 'VOus avez perdu !', 'TRAORE');