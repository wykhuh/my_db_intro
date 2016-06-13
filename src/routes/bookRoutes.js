var express = require('express');
var bookRouter = express.Router();

// export a function that returns a router

// the function is passed in nav;
// can use passed in nav for every route.
var router = function(nav) {
  bookRouter.route('/')
    .get(function(req, res) {
      var records = [{ title: 'Cat in the Hat', author: 'Dr. Seuss' }];
      res.render(
        'books',
        {
          nav: nav,
          books: records,
          title: 'hello from render'
        }
      );
    });

  bookRouter.route('/:id')
    // do something for all http routes
    // pass in next callback that is executed when all callback is completed;
    .all(function(req, res, next) {
      var id = req.params.id;
    })

  return bookRouter;
};

module.exports = router;
