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
router.get('/teamProfile', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'teamProfile.html'));
});

router.post('/getTeamMembers', function(req,res)
{
    var teamID = req.query.team_id;
    connection.query("select user_id from team where team_id = ?", teamID, function(err, rows, fields) {
        if (!err){
            query = "select login_name from user where user_id = " + rows[0].user_id;
            for(i=1; i<rows.length; i++){
                userID = rows[i].user_id;
                query += " or user_id = " + userID;
            }
            connection.query(query , function(err, rows2, fields) {
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

router.post('/getToDoList', function(req,res)
{
    var teamID = req.query.team_id;
    connection.query("select * from todo where team_id = ?", [teamID], function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }
        else{
            res.sendStatus(401);
        }
    });
});

module.exports = router;