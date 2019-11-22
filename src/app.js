const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

var condominio = require('./routes/condominio'); 
var routes = require('./routes');
var app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/condominio', condominio.list);
app.get('/condominio/add', condominio.add);
app.post('/condominio/add', condominio.save);
app.get('/condominio/delete/:id', condominio.delete);
app.get('/condominio/edit/:id', condominio.edit);
app.post('/condominio/edit/:id', condominio.update);

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});