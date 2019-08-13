var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Bienvenue sur Express !');

}).get('/api', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Bienvenue sur la page des API !');

}).get('/etage/:numetage', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.render('chambre.ejs', {etage: req.params.numetage});
    //res.send('Bienvenue à l\'étage numéro : ' + req.params.numetage);

}).get('/compter/:nombre', (req, res) => {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
}).use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');

}).listen(8080);