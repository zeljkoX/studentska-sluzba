
var express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  baza = 'mongodb://localhost/studentska-sluzba';

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
app.set('ime', 'ZM');

app.get('/', function(req, res){
  res.render('index', {'ime':'Zeljko Markovic1' });
});
/*
app.get(/[^\/]/,function(req, res){
  res.location('sdfsdf');

});
*/
//app.get('/users', user.list);

require('./routes/ispiti')(app, modeli.ispiti);
require('./routes/studenti')(app, modeli.studenti);
require('./routes/fakulteti')(app, modeli.fakultet);