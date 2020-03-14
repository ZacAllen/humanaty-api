var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var signUpRouter = require('./routes/signUp');
var loginRouter = require('./routes/login');
var loginGoogleRouter = require('./routes/loginGoogle');
var checkLoginRouter = require('./routes/isUserLoggedIn');
var accountInfoRouter = require('./routes/accountInfo');
var changeStatusRouter = require('./routes/changeStatus');
var testAPIRouter = require("./routes/testAPI");
var firebaseRouter = require('./routes/firebase');
var createEventRouter = require('./routes/create-event');
var eventInfoRouter = require('./routes/eventInfo');
var getEventsByCityRouter = require('./routes/getEventsByCity');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signUp', signUpRouter);
app.use('/login', loginRouter);
app.use('/loginGoogle', loginGoogleRouter);
app.use("/testAPI", testAPIRouter);
app.use("/firebase", firebaseRouter);
app.use("/isUserLoggedIn", checkLoginRouter);
app.use("/logout", logoutRouter);
app.use("/changeStatus", changeStatusRouter);
app.use("/create-event", createEventRouter);
app.use("/eventInfo", eventInfoRouter);
app.use("/get-events-by-city", getEventsByCityRouter);


// NEW ROUTING EXAMPLE
require('./routes/users-route')(app);
require('./routes/events-route')(app);
require('./routes/farmers-route')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = app;
