const { Client } = require('pg');
var connectionString = "postgres://postgres:docker@localhost:5432/postgres";

const client = new Client({
    connectionString: connectionString
});

client.connect();

exports.list = function (req, res) {

    client.query('SELECT * FROM condominio', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('condominio/list', { title: "Condomínios", data: result.rows });
    });

};

exports.add = function (req, res) {
    res.render('condominio/add', { title: "Adicionar condomínio"  });
};

exports.edit = function (req, res) {

    var id = req.params.id;

    client.query('SELECT * FROM condominio WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('condominio/edit', { title: "Editar condomínio", data: result.rows });
    });

};

exports.save = function (req, res) {

    var cols = [req.body.nome, req.body.habitantes, req.body.email];

    client.query('INSERT INTO condominio(nome, habitantes, email) VALUES($1, $2, $3) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/condominio');
    });

};

exports.update = function (req, res) {

    var cols = [req.body.nome, req.body.habitantes, req.body.email, req.params.id];

    client.query('UPDATE condominio SET nome=$1, habitantes=$2,email=$3 WHERE id=$4', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/condominio');
    });

};

exports.delete = function (req, res) {

    var id = req.params.id;

    client.query("DELETE FROM condominio WHERE id=$1", [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/condominio');
    });

};