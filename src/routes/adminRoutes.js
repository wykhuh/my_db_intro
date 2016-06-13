var express = require('express');
var adminRouter = express.Router();

var router = function(nav) {
  adminRouter.route('/addBooks')
    .get(function(req, res) {
      res.send('inserting book');
    });

  return adminRouter;
};

module.exports = router;
