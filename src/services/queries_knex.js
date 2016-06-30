// connect to database
var knex = require('../../db/db.js');
var db;

function queries() {
  function selectBooksAuthors(cb) {
    cb(undefined, []);
  }

  function insertBook(data, cb) {
    cb(undefined, '');
  }

  function selectBooks(cb) {
    cb(undefined, {});
  }

  function selectBook(data, cb) {
    cb(undefined, {});
  }

  function editBook(data, cb) {
    cb(undefined, '');
  }

  function deleteBook(data, cb) {
    cb(undefined, '');
  }

  function insertAuthor(data, cb) {
    cb(undefined, '');
  }

  function selectAuthors(cb) {
    cb(undefined, []);

  }

  function selectAuthor(data, cb) {
    cb(undefined, {});
  }

  function editAuthor(data, cb) {
    cb(undefined, '');
  }

  function deleteAuthor(data, cb) {
    cb(undefined, '');
  }


  return {
    selectBooksAuthors: selectBooksAuthors,
    insertAuthor: insertAuthor,
    selectAuthors: selectAuthors,
    selectAuthor: selectAuthor,
    editAuthor: editAuthor,
    deleteAuthor: deleteAuthor,
    insertBook: insertBook,
    selectBooks: selectBooks,
    selectBook: selectBook,
    editBook: editBook,
    deleteBook: deleteBook
  };
}

module.exports = queries();
