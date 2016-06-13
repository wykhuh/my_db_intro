var express = require('express');

// create an instance of express
var app = express();

var port = process.env.PORT || 5000;

var nav = [
  {link: '/books', text: 'Books'},
  {link: '/authors', text: 'Authors'}
];

// bookRouter, adminRouter are functions that we can pass nav into
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

// app.use is middleware that will be done first

// when there is any request, express will look for the request files in
// the static 'public' directory.
app.use(express.static('public'));

// tell express where we are storing views
app.set('views', './src/views');

// set template engine
app.set('view engine', 'ejs');

// use router so you can list all the http verbs for one route
// all routes for bookRouter start with '/books'
app.use('/', bookRouter);
// all routes for adminRouter start with '/admin'
app.use('/admin', adminRouter);



app.listen(port, function(err) {
  console.log('running server on port: ' + port);
});
