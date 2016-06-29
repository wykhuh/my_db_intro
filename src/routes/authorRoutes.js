var express = require('express');
var authorRouter = express.Router();
// var queries = require('../services/queries.js');
var queries = require('../services/queries_knex.js');
var db = require('../../db/db.js');

// export a function that returns a router

var router = function () {
  authorRouter.route('/')
    .get(function (req, res) {
      // select all authors
      queries.selectAuthors(function (err, records) {
        if (err) { console.log('error: ', err); return; }

        res.render(
          // use authors template
          'authors',
          // pass data to template
          {
            flash: false,
            authors: records,
            title: 'Favorite Authors',
            showMessage: false
          }
        );
      });
    })
    .post(function (req, res) {
      var errors;
      var data;

      // form validations
      req.checkBody('firstname', 'First Name is required').notEmpty();
      req.checkBody('lastname', 'Last Name is required').notEmpty();
      errors = req.validationErrors();

      // if form data is not valid, show errors
      if (errors) {
        // show errors if form is incomplete
        res.render(
          'authors',
          {
            flash: { type: 'alert-danger', messages: errors },

            authors: [],
            title: 'Favorite Authors'
          }
        );
      } else {
        // get data from the form
        data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname
        };
        queries.insertAuthor(data);

        // redirect to home page
        res.redirect('/authors');
      }
    });

  // show edit form
  authorRouter.route('/edit/:id')
    .get(function (req, res) {
      var data = {
        authorId: req.params.id
      };
      // select one author
      queries.selectAuthor(data, function (err, record) {
        if (err) { console.log('error: ', err); return; }
        console.log(record)

        res.render(
          // use authors template
          'edit-author-form',
          // pass data to template
          {
            flash: false,
            author: record,
            title: 'Edit Author',
            showMessage: false
          }
        );
      });
    });

  authorRouter.route('/:id')
    // edit author
    .put(function (req, res) {
      var data;
      var errors;

      // form validations
      req.checkBody('firstname', 'First Name is required').notEmpty();
      req.checkBody('lastname', 'Last Name is required').notEmpty();
      errors = req.validationErrors();

      if (errors) {
        var data = {
          authorId: req.params.id
        };
        // show errors if form is incomplete
        // select one author
        queries.selectAuthor(data, function (err, record) {
          if (err) { console.log('error: ', err); return; }

          res.render(
            // use authors template
            'edit-author-form',
            // pass data to template
            {
              flash: { type: 'alert-danger', messages: errors },
              author: record,
              title: 'Edit Author'
            }
          );
        });
      } else {
        data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          authorId: req.body.id
        };
        queries.editAuthor(data);

        res.redirect('/authors');
      }
    })
    // delete authorId
    .delete(function (req, res) {
      var data = {
        authorId: req.body.id
      };
      queries.deleteAuthor(data);
      res.redirect('/authors');
    });

  return authorRouter;
};

module.exports = router;
