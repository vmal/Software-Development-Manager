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
router.get('/createClass', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'createClass.html'));
});

router.post('/create_the_class', function(req,res)
{
    var classCode = req.query.class;
    var instructor = req.query.instructor;
    var values = [[classCode, instructor]];
    connection.query("select MAX(cNum) as MAX from classes", function(err,rows, fields){
        if(!err){
            console.log(rows[0].MAX);
            var values = [[classCode, instructor, rows[0].MAX + 1]];
            console.log(values);
            connection.query("insert into classes (cName, prof, cNum) values ?", [values], function(err, rows, fields) {
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
        }
    });

});

module.exports = router;