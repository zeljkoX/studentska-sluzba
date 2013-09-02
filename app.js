var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  studenti = require('./studenti/app'),
  administracija = require('./administracija/app'),
  mongoose = require('mongoose'),
  model = mongoose.models.Student;

var app = express();
users = {
  username: 'admin',
  password: 'admin'
};
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.session({
  secret: 'studentska-sluzba',
  key: 'express.sid',
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/studenti', studenti);
app.use('/administracija', administracija);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', function(req, res) {
  res.render('index.hjs');
});
app.post('/login', function(req, res) {
  var username = req.param('username', null);
  var password = req.param('password', null);

  if (null == username || username.length < 1 || null == password || password.length < 1) {
    res.send(400);
    return;
  }
  if (username.search(/^[0-9]*$/g) != -1) {

    model.findOne({
      aktivan: 'da',
      _id: username
    }, function(err, doc) {
      if (doc.sifra == password) {
        req.session.loggedIn = true;
        req.session.tip = 'student';
        req.session._id = doc._id;
        res.end('studenti/' +doc._id+ '/');
      } else res.send(401);
    });
  } else {
    if (username == users.username && password == users.password) {
      req.session.loggedIn = true;
      req.session.tip = 'administrator';
      req.session._id = username;
      res.end('administracija/');
    } else res.send(401);
  }

});
app.get('/logout/', function(req, res) {
  req.session.loggedIn = false;
  req.session.tip = '';
  req.session._id = '';
  res.redirect('/');
});
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});