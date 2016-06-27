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
    insertBook: insertBook,
    insertAuthor: insertAuthor
  };
}

module.exports = queries();
