var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'mysql.cs.iastate.edu',
    user : 'dbu309gp01',
    password : 'CwjxLEgRDvq',
    database: 'db309gp01'
});

connection.connect();

router.get('/teamListPage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'team_list.html'));
});

router.get('/team_req', function(req, res, next) {
    user_id = req.query.user_id;
    connection.query("select team_name, team_id from team where user_id = ?", user_id, function(err, rows, fields) {
        if (!err){
            res.json(rows);
            //connection.end();
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

module.exports = router;