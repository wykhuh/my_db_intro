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
      queries.selectBooksAuthors(function (err, books) {
        if (err) { console.log('error: ', err); return; }

        queries.selectAuthors(function (err2, authors) {
          if (err2) { console.log('error: ', err2); return; }

          res.render(
            // use books template
            'books',
            // pass data to template
            {
              flash: false,
              nav: nav,
              books: books,
              authors: authors,
              title: 'Favorite Books',
              errors: []
            }
          );
        });
      });
    })
    .post(function (req, res) {
      var errors;
      var data;

      // form validations
      req.checkBody('title', 'Title is required').notEmpty();
      req.checkBody('authorId', 'Author is required').notEmpty();
      errors = req.validationErrors();

      // if form data is not valid, show errors
      if (errors) {
        queries.selectAuthors(function (err2, authors) {
          if (err2) { console.log('error: ', err2); return; }

          // show errors if form is incomplete
          res.render(
            'books',
            {
              flash: { type: 'alert-danger', messages: errors },
              nav: nav,
              books: [],
              authors: authors,
              title: 'Favorite Books'
            }
          );
        });

      } else {
        // get data from the form
        data = {
          title: req.body.title,
          authorId: req.body.authorId
        };

        queries.insertBook(data);
        // redirect to home page
        res.redirect('/');
      }
    });

  // show edit form
  bookRouter.route('/edit/:id')
    .get(function (req, res) {
      var data = {
        bookId: req.params.id
      };

      // select one book
      queries.selectBook(data, function (err, book) {
        if (err) { console.log('error: ', err); return; }
        queries.selectAuthors(function (err2, authors) {
          if (err2) { console.log('error: ', err2); return; }

          res.render(
            // use books template
            'edit-book-form',
            // pass data to template
            {
              nav: nav,
              book: book,
              authors: authors,
              title: 'Edit Book',
              flash: false
            }
          );
        });
      });
    });

  bookRouter.route('/:id')
    // edit book
    .put(function (req, res) {
      var errors;
      var data;


      // form validations
      req.checkBody('title', 'Title is required').notEmpty();
      req.checkBody('authorId', 'Author is required').notEmpty();
      errors = req.validationErrors();


      // if form data is not valid, show errors
      if (errors) {
        data = {
          bookId: req.params.id
        };
        // show errors if form is incomplete
        // select one book
        queries.selectBook(data, function (err, record) {
          if (err) { console.log('error: ', err); return; }
          res.send('stop=-----')
          queries.selectAuthors(function (err2, authors) {
            if (err2) { console.log('error: ', err2); return; }
            res.render(
              // use books template
              'edit-book-form',
              // pass data to template
              {
                flash: { type: 'alert-danger', messages: errors },
                nav: nav,
                book: record,
                authors: authors,
                title: 'Edit Author'
              }
            );
          });
        });
      } else {

        data = {
          title: req.body.title,
          bookId: req.body.id,
          authorId: req.body.authorId
        };
        console.log(data)
        queries.editBook(data);

        res.redirect('/');
      }
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
