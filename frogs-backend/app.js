const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const cors = require('cors');

const indexRouter = require('./routes/index');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth'); 

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRoutes); 

app.use('/', indexRouter);
app.use('/users', userRoutes);

app.use((req, res, next) => { 
  console.log(req.method, req.url); 
  next(); 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // ... (error handling logic)
});

module.exports = app;
