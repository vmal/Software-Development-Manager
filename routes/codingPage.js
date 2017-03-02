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
 coding home page
 */
router.get('/codingPage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'coding_home_page.html'));
});

module.exports = router;