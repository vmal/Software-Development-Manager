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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});
/*
Request for the login
 */
router.post('/login', function(req,res)
{

    console.log("Username:"+req.query.username);
    console.log("Password:"+req.query.password);

    var user = req.query.username;
    var pass = req.query.password;

    connection.query("select * from user where login_name = ?", user, function(err, rows, fields) {
            if (!err && rows[0] != undefined) {
                if(user==rows[0].login_name && pass==rows[0].pass){
                    connection.query("select user_id, type, login_name from user where login_name = ?", user, function(err, rows, fields){
                        if (!err){
                            res.json(rows);

                        }
                        else{
                            res.sendStatus(401);
                        }
                    });
                }
            }
            else{
                console.log('Error while performing Query.', err);
                res.sendStatus(401);
            }
        });
});


module.exports = router;