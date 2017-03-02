/**
 * Created by vaibhav malhotra on 10/19/2016.
 */
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

router.get('/allMembers', function(req, res, next) {
    connection.query("select user_id, login_name, firstName, lastName from user", function(err, rows, fields) {
        if (!err){
            res.send(rows);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});


router.get('/videoChat', function(req, res, next)
{
    res.sendFile(path.join(__dirname, '../', 'views', 'videochat.html'));
});


connection.end();
module.exports=router;