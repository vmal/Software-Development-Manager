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

/*
 Request for the profile html
 */
router.get('/gradingPage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'gradingPage.html'));
});

router.get('/grading_req', function(req, res, next){
    var user = req.query.team_id;
    console.log(user);
    connection.query("select * from grades where team_id = ?", user, function(err, rows, fields) {
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.sendStatus(401);
        }
    });
});

router.post('/updateGrade', function(req, res, next){
    var id = parseInt(req.query.assignment);
    var points = parseFloat(req.query.total);
    query = ("update grades set point_r = " + points + " where assignment_id = " + id);
    connection.query(query , function(err, rows, fields) {
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log(err);
            res.sendStatus(401);
        }
    });
});


module.exports = router;