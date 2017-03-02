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
 create team
 */
router.get('/createTeamPage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'create_team.html'));
});

router.post('/create_the_team', function(req,res)
{
    var user = req.query.user_id;
    var team = req.query.teamName;
    var classCode = req.query.class;
    var instructor = req.query.instructor;
    connection.query("select MAX(team_id) as MAX from team", function(err, rows, fields){
        if(!err){
            console.log(rows[0].MAX);
            var values = [[user, team, rows[0].MAX + 1, classCode, instructor]];
            connection.query("insert into team (user_id, team_name, team_id, class, prof) values ?", [values], function(err, rows2, fields) {
                        if (!err){
                            connection.query("select cNum from classes where cName = ?", classCode, function(err, rows3, fields) {
                                if (!err){
                                    values = [[classCode, rows3[0].cNum, instructor, rows[0].MAX + 1]];
                                    connection.query("insert into classes (cName, cNum, prof, team_id) values ?", [values], function(err, rows, fields) {
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
        }
        else{
            console.log('Error while performing Query.', err);
        }
    });
});

module.exports = router;