var express = require('express');
var bookRouter = express.Router();
// connect to database
var file = './db/library.db';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

// export a function that returns a router

// the function is passed in nav;
// can use passed in nav for every route.
var router = function(nav) {
  bookRouter.route('/')
    .get(function (req, res) {
      var records = [{ title: 'Cat in the Hat', author: 'Dr. Seuss' }];
      res.render(
        'books',
        {
          nav: nav,
          books: records,
          title: 'Favorite Books'
        }
      );
    });

  bookRouter.route('/add-book')
    .post(function (req, res) {
      var title;
      var firstname;
      var lastname;
      var sql;
      title = req.body.title;
      firstname = req.body.firstname;
      lastname = req.body.lastname;

      sql = 'INSERT into books(title) VALUES(?)';
      db.run(sql, title);

      sql = 'INSERT into authors(firstname, lastname) VALUES(?, ?)';
      db.run(sql, firstname, lastname);

      // redirect to home page
      res.redirect('/');

    });

  bookRouter.route('/:id')
    // do something for all http routes
    // pass in next callback that is executed when all callback is completed;
    .all(function (req, res, next) {
      var id = req.params.id;
    })

  return bookRouter;
};

module.exports = router;
