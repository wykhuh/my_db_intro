// read files in the filesystem
var fs = require('fs');
// location of database
var file = 'library.db';
// check if database exists
var exists = fs.existsSync(file);
// connect to database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

// run transactions in series, e.g. do one command at a time
db.serialize(function () {
  if (!exists) {
    db.run('CREATE TABLE books (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'title TEXT, ' +
      'author_id INTEGER, ' +
      ' FOREIGN KEY(author_id) REFERENCES authors(id)' +
    ')');

    db.run('CREATE TABLE authors (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'firstname TEXT, ' +
      'lastname TEXT ' +
    ')');
  }
});
db.close();
