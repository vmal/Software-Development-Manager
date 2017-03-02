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

router.get('/ToDoPage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'TODO.html'));
});

router.get('/todo_req', function(req, res, next)
{
    var teamID = parseInt(req.query.team_id);
    connection.query("select message, msg_id from todo where team_id = ?", teamID, function(err, rows, fields)
    {
        if (!err){
            console.log(rows);
            res.json(rows);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});
router.post('/ToDoList', function(req,res,next)
{
    var todo = req.query.toDoList;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, todo]];
    connection.query('insert into todo (team_id, message) values ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/deleteMessage', function(req,res,next)
{
    var msg_id = parseInt(req.query.message_ID);
    connection.query('DELETE FROM todo where msg_id = ?', msg_id, function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

/*
//attempt at router.delete below. Not sure if this is how it works. -Diva
router.post('/deleteMessage', function(req,res,next)
{
    var msg_id = parseInt(req.query.team_id);
    console.log(msg_id);
    //I'm pretty sure the query below is very wrong, not sure how to do back end stuff -Diva
    connection.query('DELETE FROM todo where msg_id = ?', msg_id, function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});*/

module.exports = router;