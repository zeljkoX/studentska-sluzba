var express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  baza = 'mongodb://admin:admin@mongo.onmodulus.net:27017/epa6Toju';

var app = module.exports = express();

var modeli = {
  studenti: require('./modeli/student')(mongoose),
  profesori: require('./modeli/profesor')(mongoose),
  predmeti: require('./modeli/predmet')(mongoose),
  ispiti: require('./modeli/ispit')(mongoose),
  fakultet: require('./modeli/fakultet')(mongoose)
};

mongoose.connect(baza, function onMongooseError(err) {
  if (err) {
    throw err;
    console.console.log('>Neuspjesna konekcija na mongodb');
  }
});

// all environments
/*app.use(function(req ,res ,next){
  if(req.session && req.session.loggedIn && req.session.tip =='administrator'){
    next();
}else{
  res.redirect('/');
}
});*/
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.set('ime', 'administrator');

app.get('/', function(req, res) {
  res.render('index');
});
/*
app.get(/[^\/]/,function(req, res){
  res.location('sdfsdf');

});
*/
//app.get('/users', user.list);

require('./routes/ispiti')(app, modeli);
require('./routes/studenti')(app, modeli);
require('./routes/fakulteti')(app, modeli.fakultet);
require('./routes/predmeti')(app, modeli.predmeti);
require('./routes/profesori')(app, modeli.profesori);