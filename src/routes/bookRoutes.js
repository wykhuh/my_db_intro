var express = require('express');
var bookRouter = express.Router();
// connect to database
var file = './db/library.db';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

function selectAuthor(firstname, lastname, cb) {
  var sql = 'SELECT id FROM authors WHERE firstname=? AND lastname=?';
  db.get(sql, firstname, lastname, cb);
}

function insertBook(title, authorId, cb) {
  var sql = 'INSERT into books(title, author_id) VALUES(?, ?)';
  db.run(sql, title, authorId, cb);
}

function insertAuthor(firstname, lastname, cb) {
  var sql = 'INSERT into authors(firstname, lastname) VALUES(?, ?)';
  db.run(sql, firstname, lastname, cb);
}


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
          title: 'Favorite Books',
          showMessage: false
        }
      );
    });

  bookRouter.route('/add-book')
    .post(function (req, res) {
      var title;
      var firstname;
      var lastname;

      function renderMessage(message, type) {
        res.render(
          'books',
          {
            nav: nav,
            books: [],
            title: 'Favorite Books',
            showMessage: true,
            message: message,
            messageType: type
          }
        );
      }

      title = req.body.title;
      firstname = req.body.firstname;
      lastname = req.body.lastname;

      if (title && firstname && lastname) {
        // look for author in database
        selectAuthor(firstname, lastname, function (err, res) {
          if (err) { console.log('error: ', err); return; }
          // if author exists, insert book
          if (res) {
            insertBook(title, res.id)
          // if author doesn't exist, insert book and author
          } else {
            insertAuthor(firstname, lastname, function (err){
              if (err) { console.log('error: ', err); return; }
              insertBook(title, this.lastID);
            })
          }
        });
        // redirect to home page
        res.redirect('/')
      } else {
        // show errors if form is incomplete
        renderMessage('All fields must be filled out', 'danger')
      }
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
