// connect to database
var knex = require('../../db/db.js');

var file = './db/library.db';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

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

  function insertAuthor(data) {
    var sql = "INSERT into authors(firstname, lastname) VALUES(?, ?)";
    db.run(sql, data.firstname, data.lastname);
  }

  function selectAuthors(cb) {
    var sql = "SELECT * from authors";
    db.all(sql, cb);
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
