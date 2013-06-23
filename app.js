var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  studenti = require('./studenti/app'),
  administracija = require('./administracija/app'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server;
var app = express();
app.set('mongoClient', new MongoClient(new Server('localhost', 27017)));
//var mongoClient = new MongoClient(new Server('localhost', 27017));

app.get('mongoClient').open(function(err, mongoClient) {
  console.log('>Uspjesna konekcija na mongodb');
  mongoClient.close();
});

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  // asynchronous verification, for effect...
  process.nextTick(function() {

    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message.  Otherwise, return the
    // authenticated `user`.
    findByUsername(username, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown user ' + username
        });
      }
      if (user.password != password) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }
      return done(null, user);
    })
  });
}));



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.session({
  secret: 'studentska-sluzba'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/studenti', studenti);
app.use('/administracija', administracija);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', function(req, res) {
  res.redirect('index.html');
});
app.post('/login',
  passport.authenticate('local', {
  failureRedirect: 'index.html'
}), function(req, res) {
  res.redirect('studenti/');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});