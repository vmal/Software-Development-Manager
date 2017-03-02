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
router.get('/profilePage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'profile.html'));
});
/*
 Request for retrieving the teams each user is associated with.
 */
router.post('/profile_req', function(req,res)
{

    var user_ID = req.query.user_id;
    console.log(user_ID);
    connection.query("select * from user where user_id = ?", [user_ID], function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }
        else{
            res.sendStatus(401);
        }
    });
});

router.post('/getTeams', function(req,res)
{
    var user_ID = req.query.user_id;
    connection.query("select * from team where user_id = ?", [user_ID], function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }
        else{
            res.sendStatus(401);
        }
    });
});

module.exports = router;