// connect to database
var file = './db/library.db';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

function queries() {
  function selectBooksAuthors(cb) {
    var sql = 'SELECT * FROM authors ' +
              'JOIN books ON authors.id = books.author_id ' +
              'ORDER By books.id DESC';
    db.all(sql, cb);
  }

  function insertBook(data, cb) {
    var sql = 'INSERT into books(title, author_id) VALUES(?, ?)';
    db.run(sql, data.title, data.authorId, cb);
  }

  function selectBooks(cb) {
    var sql = 'SELECT * FROM books ' +
              'ORDER By books.id DESC';
    db.all(sql, cb);
  }

  function selectBook(data, cb) {
    var sql = 'SELECT * FROM authors ' +
              'JOIN books ON authors.id = books.author_id ' +
              'WHERE books.id =? ' +
              'ORDER By books.id DESC';
    db.get(sql, data.bookId, cb);
  }

  function editBook(data) {
    var sql = 'UPDATE books set title = ?, author_id = ? WHERE id = ?';
    db.run(sql, data.title, data.authorId, data.bookId);
  }

  function deleteBook(data) {
    var sql = 'DELETE FROM books WHERE books.id =? ';
    db.run(sql, data.bookId);
  }

  function insertAuthor(data, cb) {
    var sql = 'INSERT into authors(firstname, lastname) VALUES(?, ?)';
    db.run(sql, data.firstname, data.lastname, cb);
  }

  function selectAuthors(cb) {
    var sql = 'SELECT * FROM authors ' +
              'ORDER By authors.lastname ASC, authors.firstname ASC';
    db.all(sql, cb);
  }

  function selectAuthor(data, cb) {
    var sql = 'SELECT * FROM authors WHERE id=?';
    db.get(sql, data.authorId, cb);
  }

  function editAuthor(data) {
    var sql = 'UPDATE authors set firstname = ?, lastname = ? WHERE id = ?';
    db.run(sql, data.firstname, data.lastname, data.authorId);
  }

  function deleteAuthor(data) {
    var sql = 'DELETE FROM authors WHERE authors.id =? ';
    db.run(sql, data.authorId);
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
