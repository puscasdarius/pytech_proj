var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var ejs = require('ejs');
var index = require('./route/index-route.js')
var port = 3000;

var app = express();

//mongoose.connect(link);
var link = "mongodb://root:root@ds123695.mlab.com:23695/phone";
mongoose.connect(link,function(err){
  if(err) throw err;
  console.log("DB connected");
})
// view engine setup
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/',index);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port,function(){
  console.log('Server Connected on '+port);
})
module.exports = app;
