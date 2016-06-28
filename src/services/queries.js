// connect to database
var file = './db/library.db';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

function queries() {
  function selectBooks(cb) {
    var sql = 'SELECT * FROM authors ' +
              'JOIN books ON authors.id = books.author_id ' +
              'ORDER By books.id DESC';
    db.all(sql, cb);
  }

  function selectBook(bookId, cb) {
    var sql = 'SELECT * FROM authors ' +
              'JOIN books ON authors.id = books.author_id ' +
              'WHERE books.id =? ' +
              'ORDER By books.id DESC';
    db.get(sql, bookId, cb);
  }

  function deleteBook(bookId) {
    var sql = 'DELETE FROM books ' +
              'WHERE books.id =? ';
    db.run(sql, bookId);
  }

  function editBook(bookId, title, authorId, firstname, lastname) {
    var sql = 'UPDATE books set title = ? WHERE id = ?';
    db.run(sql, title, bookId);

    sql = 'UPDATE authors set firstname = ?, lastname = ? WHERE id = ?';
    db.run(sql, firstname, lastname, authorId);
  }

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

  return {
    selectAuthor: selectAuthor,
    selectBooks: selectBooks,
    selectBook: selectBook,
    editBook: editBook,
    insertBook: insertBook,
    insertAuthor: insertAuthor,
    deleteBook: deleteBook
  };
}

module.exports = queries();
