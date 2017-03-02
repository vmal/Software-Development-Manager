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
 Request for the sign up html
 */
router.get('/signUpPage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'SignUp.html'));
});
/*
 Request for updating the database with the new user.
 */
router.post('/signUp', function(req,res)
{
    var user = req.query.username;
    var first = req.query.firstName;
    var last = req.query.lastName;
    var pass = req.query.password;
    var email = req.query.email;
    var userType = req.query.type;
    var values = [[user, first, last, pass, email, userType]];
    connection.query("insert into user (login_name, firstName, lastName, pass, email, type) values ?", [values], function(err, rows, fields) {
        if (!err){
            connection.query("select user_id, type from user where login_name = ?", user, function(err, rows, fields){
                if (!err){
                    res.json(rows);
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

module.exports = router;