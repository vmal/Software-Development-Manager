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

router.get('/announcements', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'announcements.html'));
});


router.get('/scrum_req', function(req, res, next)
{
    var teamID = parseInt(req.query.team_id);
    connection.query("select * from announcements where team_id = ?", teamID, function(err, rows, fields)
    {
        if (!err){
            var backlogList = [];
            var sprintList = [];
            var completeList = [];
            var meetingList = [];
            //make this type specific...
            for(var i = 0; i < rows.length; i++) {
                if(rows[i].type == 'backlog') {
                    backlogList[backlogList.length] = rows[i];
                }
                else if(rows[i].type == 'sprint') {
                    sprintList[sprintList.length] = rows[i];
                }
                else if(rows[i].type == 'complete') {
                    completeList[completeList.length] = rows[i];
                }
                else {
                    meetingList[meetingList.length] = rows[i];
                }
            }

            res.json({backlog: backlogList, sprint: sprintList, complete: completeList, meetings: meetingList});
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});


router.post('/addBacklog', function(req,res,next)
{
    var backlog = req.query.backlog;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, backlog, 'backlog']];
    console.log(values);
    connection.query('insert into announcements (team_id, message, type) values ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/backlogToSprint', function(req,res,next)
{
    var msgID = req.query.msg_id;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, msgID]];
    connection.query('update announcements set type = "sprint" where (team_id, msg_id) = ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/addSprint', function(req,res,next)
{
    var sprint = req.query.sprint;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, sprint, 'sprint']];
    connection.query('insert into announcements (team_id, message, type) values ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/sprintToBacklog', function(req,res,next)
{
    var msgID = req.query.msg_id;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, msgID]];
    connection.query('update announcements set type = "backlog" where (team_id, msg_id) = ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/sprintToComplete', function(req,res,next)
{
    var msgID = req.query.msg_id;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, msgID]];
    connection.query('update announcements set type = "complete" where (team_id, msg_id) = ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/addComplete', function(req,res,next)
{
    var complete = req.query.complete;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, complete, 'complete']];
    connection.query('insert into announcements (team_id, message, type) values ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/completeToSprint', function(req,res,next)
{
    var msgID = req.query.msg_id;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, msgID]];
    connection.query('update announcements set type = "sprint" where (team_id, msg_id) = ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/addMeeting', function(req,res,next)
{
    console.log('in addMeeting');
    var meeting = req.query.meeting;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, meeting, 'meeting']];
    console.log(values);
    connection.query('insert into announcements (team_id, message, type) values ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/deleteMeeting', function(req,res,next)
{
    var msgID = req.query.msg_id;
    var team_id = parseInt(req.query.team_id);
    var values = [[team_id, msgID]];
    connection.query('delete from announcements where (team_id, msg_id) = ?', [values], function(err, rows, fields){
        if (!err){
            res.sendStatus(200);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

module.exports = router;