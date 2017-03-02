/**
 * Created by vaibhav malhotra on 10/9/2016.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var http = require('http').Server(router);
var io = require('socket.io').listen(http);


var connection = mysql.createConnection({
    host : 'mysql.cs.iastate.edu',
    user : 'dbu309gp01',
    password : 'CwjxLEgRDvq',
    database: 'db309gp01'
});

connection.connect();

router.get('/chatBoard', function(req, res, next)
{
    res.sendFile(path.join(__dirname, '../', 'views', 'chat.html'));
});

router.post('/messageLog', function(req, res)
{
    var teamID = req.body.team_id;
    connection.query("Select text from messages where team_id = ?", [teamID], function(err, rows){
        if (!err){
            res.json(rows);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

module.exports=router;