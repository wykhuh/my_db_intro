var express = require('express');
var bookRouter = express.Router();
var queries = require('../services/queries.js');

// export a function that returns a router

// the function is passed in nav;
// can use passed in nav for every route.
var router = function (nav) {
  bookRouter.route('/')
    .get(function (req, res) {
      // select all books
      queries.selectBooks(function (err, records) {
        if (err) { console.log('error: ', err); return; }

        res.render(
          // use books template
          'books',
          // pass data to template
          {
            nav: nav,
            books: records,
            title: 'Favorite Books',
            showMessage: false
          }
        );
      });
    })
    .post(function (req, res) {
      // get information from form
      var data = {
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      };

      function renderMessage(message, type) {
        res.render(
          // use books template
          'books',
          // pass data to template
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

      // check if all form fields are filled out
      if (data.title && data.firstname && data.lastname) {
        // look for author in database
        queries.selectAuthor(data, function (err, results) {
          if (err) { console.log('error: ', err); return; }
          // if author exists, insert book
          if (results) {
            queries.insertBook(data, res.id);
          // if author doesn't exist, insert book and author
          } else {
            queries.insertAuthor(data, function (error) {
              if (error) { console.log('error: ', error); return; }
              data.authorId = this.lastID;
              queries.insertBook(data);
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

  // show edit form
  bookRouter.route('/edit/:id')
    .get(function (req, res) {
      var data = {
        id: req.body.id
      };
      // select one book
      queries.selectBook(data, function (err, record) {
        if (err) { console.log('error: ', err); return; }

        res.render(
          // use books template
          'edit-form',
          // pass data to template
          {
            nav: nav,
            book: record,
            title: 'Edit Book',
            showMessage: false
          }
        );
      });
    });

  bookRouter.route('/:id')
    // edit book
    .put(function (req, res) {
      var data = {
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bookId: req.body.id,
        authorId: req.body.author_id
      };
      queries.editBook(data);

      res.redirect('/');
    })
    // delete bookId
    .delete(function (req, res) {
      var data = {
        bookId: req.body.id
      };
      queries.deleteBook(data);
      res.redirect('/');
    });

  return bookRouter;
};

module.exports = router;
