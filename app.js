var express = require('express');
request = require('request'),
    async = require('async'),
    config = require('./config');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var mysql = require('mysql');

var fs = require('fs');

const https = require('https');

const options = {
  key: fs.readFileSync('./conf/key.pem'),
  cert: fs.readFileSync('./conf/cert.pem')
};

var server = https.createServer(options,app);
var port= process.env.PORT || 1024;
server.listen(port, function(){
  console.log('Server is running on port: '+port);
});

io.attach(server);

var routes = require('./routes/index');
var signup = require('./routes/signUp'); ///
var codingpage = require('./routes/codingPage');
var createteam = require('./routes/createTeamPage');
var teamlist = require('./routes/teamListPage');
var teampage = require('./routes/teamPage');
var chat = require('./routes/chat');
var todo = require('./routes/TODO');
var calendar = require('./routes/calendar');
var announcements = require('./routes/announcements');
var profile = require('./routes/profilePage');
var videoCall = require('./routes/videochat');
var adminTeamList = require('./routes/admin_team_list');
var teamProfile = require('./routes/team_profile');
var screensharing = require('./routes/ScreenSharing');
var issues = require('./routes/issues');
var issues_opened = require('./routes/issues_opened');
var issues_assigned = require('./routes/issues_assigned');
var issues_closed = require('./routes/issues_closed');
var commits = require('./routes/commits');
var loc = require('./routes/loc');
var commit_comments = require('./routes/commit_comments');
var pull_requests = require('./routes/pull_requests');
var issue_comments = require('./routes/issue_comments');
var pull_request_comments = require('./routes/pull_request_comments');
var gradingPage = require('./routes/grades');
var assignPage = require('./routes/assign');
var createClass = require('./routes/createClass');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
//-------------------------------------------------------------------------------------------------------------
/*
 Chat application emitter
 */
var connection = mysql.createConnection({
  host : 'mysql.cs.iastate.edu',
  user : 'dbu309gp01',
  password : 'CwjxLEgRDvq',
  database: 'db309gp01'
});

io.sockets.on('connection', function (socket)
{
  socket.on('chat message', function (msg, team_id, user_id)
  {
    connection.query("select login_name from user where user_id = ?", [user_id], function(err, rows){
      if(!err){
        var name = rows[0].login_name;
        var values = [[name + ': ' + msg, team_id, user_id]];

        connection.query("insert into messages (text, team_id, user_id) values ?", [values], function(err, rows){
          if (!err){
            io.emit('chat message', msg, name);
          }
          else{
            console.log('Error while performing Query.', err);
          }
        });
      }
      else{
        console.log('Error while performing Query.', err);
      }
    });
  });
});
//------------------------------------------------------------------------------------------------------------
app.use('/',routes);
app.use('/',signup);
app.use('/',codingpage);
app.use('/',createteam);
app.use('/',teamlist);
app.use('/',teampage);
app.use('/',chat);
app.use('/',calendar);
app.use('/',todo);
app.use('/',announcements);
app.use('/',profile);
app.use('/',videoCall);
app.use('/',adminTeamList);
app.use('/',teamProfile);
app.use('/', screensharing);
app.use(express.static('./public'));
app.use('/',issues);
app.use('/',issues_opened);
app.use('/',issues_assigned);
app.use('/',issues_closed);
app.use('/',commits);
app.use('/',loc);
app.use('/',commit_comments);
app.use('/',pull_requests);
app.use('/',issue_comments);
app.use('/',pull_request_comments);
app.use('/',gradingPage);
app.use('/',assignPage);
app.use('/', createClass);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next)
{
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;