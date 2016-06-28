var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');

// create an instance of express
var app = express();

var port = process.env.PORT || 5000;

var bookRouter = require('./src/routes/bookRoutes')();
var authorRouter = require('./src/routes/authorRoutes')();

// app.use is middleware that will be done first

// when there is any request, express will look for the request files in
// the static 'public' directory.
app.use(express.static('public'));

// allow browser to use PUT and DELETE
app.use(methodOverride('_method'));

// parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// validator must be immediately after bodyParser
app.use(expressValidator([]));

// tell express where we are storing views
app.set('views', './src/views');

// set template engine
app.set('view engine', 'ejs');

// use router so you can list all the http verbs for one route
// all routes for bookRouter start with '/books'
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

// redirect from '/' to '/books'
app.get('/', function (req, res) {
  res.redirect('/books');
});

app.listen(port, function (err) {
  console.log('running server on port: ' + port);
});
