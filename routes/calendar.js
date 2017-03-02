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

router.get('/calendarPage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'calendar.html'));
});

router.get('/data', function(req, res){
    id = parseInt(req.query.teamID);
    console.log(id);
    connection.query("Select * from events where team_id = ?", id, function(err, rows){
        if (!err){
            console.log('in /data function');
            console.log(req.header);
            console.log(req.url + ' ------------------------- URL');
            res.send(rows);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.get('/data2', function(req, res){
    event = req.query.text;
    start = req.query.start_date;
    end = req.query.end_date;
    name = req.query.text;
    id = parseInt(req.query.teamID);
    //get operation type
    var mode = req.query["!nativeeditor_status"];
    //get id of record
    values = [[event, start, end, name, id]];
    //update insert delete
    if (mode == "inserted"){
        connection.query("insert into events (details, start_date, end_date, text, team_id) values ?", [values], function(err, rows){
            if (!err){
                res.sendStatus(200);
            }
            else{
                console.log('Error while performing Query.', err);
                res.sendStatus(401);
            }
        });
    }
    else if (mode == "deleted"){
        event = req.query.event_id;
        connection.query("delete from events where event_id = ?", event, function(err, rows){
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
        event = req.query.event_id;
        connection.query("delete from events where event_id = ?", event, function(err, rows){
            if (!err){
                connection.query("insert into events (details, start_date, end_date, text, team_id) values ?", [values], function(err, rows){
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
});
module.exports = router;