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
 team page html
 */
router.get('/teamPage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'team_page.html'));
});

router.get('/members_req', function(req, res, next) {
    team_id = parseInt(req.query.team_id);
    console.log(team_id);
    var members = [];
    connection.query("select user_id from team where team_id = ?", team_id, function(err, rows, fields) {
        if (!err){
            console.log(rows);
            query = "select firstName, lastName, user_id, login_name from user where user_id = " + rows[0].user_id;
            for(i=1; i<rows.length; i++){
                userID = rows[i].user_id;
                query += " or user_id = " + userID;
            }
            console.log(query);
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

router.post('/createUser', function(req, res, next) {
    //find userID based on userName
    var username = req.query.username;
    var teamID = parseInt(req.query.team_id);
    var theID;

    connection.query("select user_id from user where login_name = ?", username, function(err, rows, fields){
        if (!err){
            theID = rows[0].user_id;
            connection.query("select team_name from team where team_id = ?", teamID, function(err, rows, fields){
                if (!err){
                    name = rows[0].team_name;
                    var values = [[theID, teamID, name]];
                    connection.query('insert into team (user_id, team_id, team_name) values ?', [values], function(err, rows, fields) {
                        if (!err){
                            res.sendStatus(200);
                        }
                        else{
                            console.log('Error while performing Query.', err);
                            res.sendStatus(401);
                        }
                    });
                }
                else{
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

module.exports = router;