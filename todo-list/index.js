var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))

/*  S'il n'y a pas de liste dans la session, 
*   On en créé une
*/
.use((req, res, next) => {
    if (typeof(req.session.todolist) == 'undefined') {
        console.info('La liste des tâche est vide !')
        req.session.todolist = [];
    }
    next();
})

/* Accueil */
.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.render('index.ejs');
})

/* Liste des tâches */
.get('/todo/list', (req, res) => {
    console.info('La liste des tâche: {}', req.session.todolist);
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* Ajouter une tâche */
.post('/todo/add/', urlencodedParser, (req, res) => {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo/list');
})

.get('/todo/delete/:id', (req, res) => {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo/list');
})

.use((req, res, next) => {
    res.redirect('/todo/list');
})

.listen(8082);