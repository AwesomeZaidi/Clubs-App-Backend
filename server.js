const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const port = process.env.PORT || 3000

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/club-app-db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: require("handlebars-helpers")(),
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
require('./data/clubs-app-db');

app.use(methodOverride('_method')) // override with POST having ?_method=DELETE or ?_method=PUT

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); 
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routers/users.js')(app);

app.listen(port);

module.exports = { app }