
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var port = process.env.PORT || 8000;
var app = express();
var cors = require('cors');
// const { functions } = require('lodash');

// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



//  const mongoUrl='mongodb://localhost:27017/user';
// const mongoUrl='mongodb+srv://sohamdb:soham123@electioncluster.u8osy.mongodb.net/userdb';

const mongoUrl='mongodb+srv://sohamdb:soham123@electioncluster.u8osy.mongodb.net/userdb';
var conc = mongoose.connect(mongoUrl,
  (err)=>{
      if(err){
      console.log("Error connect to mongoose TOUCH",err)
  }
  else{

      console.log("mongoose connected ")
  }
  });

app.listen(port,function() {
  console.log("Server started.......");
});


module.exports= app;

