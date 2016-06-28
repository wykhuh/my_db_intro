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

  function selectBook(data, cb) {
    var sql = 'SELECT * FROM authors ' +
              'JOIN books ON authors.id = books.author_id ' +
              'WHERE books.id =? ' +
              'ORDER By books.id DESC';
    db.get(sql, data.bookId, cb);
  }

  function deleteBook(data) {
    var sql = 'DELETE FROM books WHERE books.id =? ';
    db.run(sql, data.bookId);
  }

  function editBook(data) {
    var sql = 'UPDATE books set title = ? WHERE id = ?';
    db.run(sql, data.title, data.bookId);

    sql = 'UPDATE authors set firstname = ?, lastname = ? WHERE id = ?';
    db.run(sql, data.firstname, data.lastname, data.authorId);
  }

  function selectAuthor(data, cb) {
    var sql = 'SELECT id FROM authors WHERE firstname=? AND lastname=?';
    db.get(sql, data.firstname, data.lastname, cb);
  }

  function insertBook(data, cb) {
    var sql = 'INSERT into books(title, author_id) VALUES(?, ?)';
    db.run(sql, data.title, data.authorId, cb);
  }

  function insertAuthor(data, cb) {
    var sql = 'INSERT into authors(firstname, lastname) VALUES(?, ?)';
    db.run(sql, data.firstname, data.lastname, cb);
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
