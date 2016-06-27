var express = require('express');
var bookRouter = express.Router();
var queries = require('../services/queries.js')

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
        queries.selectAuthor(firstname, lastname, function (err, res) {
          if (err) { console.log('error: ', err); return; }
          // if author exists, insert book
          if (res) {
            queries.insertBook(title, res.id);
          // if author doesn't exist, insert book and author
          } else {
            queries.insertAuthor(firstname, lastname, function (err) {
              if (err) { console.log('error: ', err); return; }
              queries.insertBook(title, this.lastID);
            });
          }
        });
        // redirect to home page
        res.redirect('/');
      } else {
        // show errors if form is incomplete
        renderMessage('All fields must be filled out', 'danger');
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
