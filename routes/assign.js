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

router.get('/assignPage2', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'assign.html'));
});

router.get('/adminClass', function(req, res, next) {
    user_id = req.query.admin;
    console.log(user_id);
    connection.query("select cNum, cName from classes where prof = ?", user_id, function(err, rows, fields) {
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

router.post('/assign', function(req, res, next) {
    user_id = req.query.prof;
    cName = req.query.course;
    desc = req.query.desc;
    title = req.query.title;
    points = parseFloat(req.query.points);
    due = req.query.due;
    connection.query("select team_id from team where class = ?", cName, function(err, rows, fields) {
            if (!err){
                console.log(rows);
                query = "insert into grades (team_id, assignment, title, point_t, due) values ?";
                var values = [[]];
                for(i=0; i<rows.length; i++){
                    values[0][i] = [rows[i].team_id , desc, title, points, due];
                }
                console.log(query);
                console.log(values[0]);
                connection.query(query , [values[0]], function(err, rows2, fields) {
                    if (!err){
                        res.send(rows2);
                    }
                    else{
                        console.log('Error while performing Query.', err);
                        res.sendStatus(401);
                    }
                });
            }
            else{
                console.log('Error while performing Query.', err);
                res.sendStatus(401);
            }
    });
});


module.exports = router;