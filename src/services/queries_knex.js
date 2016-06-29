// connect to database
var knex = require('../../db/db.js');
var db;

function queries() {
  function selectBooksAuthors(cb) {
    knex('authors')
      .join('books', 'books.author_id', '=', 'authors.id')
      .select('*')
      .orderBy('books.id', 'desc')
      .asCallback(cb);
  }

  function insertBook(data, cb) {
    knex('books')
      .insert({ title: data.title, author_id: data.authorId })
      .asCallback(cb);
  }

  function selectBooks(cb) {
    knex('books')
      .select('*')
      .asCallback(cb);
  }

  function selectBook(data, cb) {
    knex('books')
      .select('*')
      .where('id', data.bookId)
      .first()
      .asCallback(cb);
  }

  function editBook(data, cb) {
    knex('books')
      .update({ title: data.title, author_id: data.authorId })
      .where('id', data.bookId)
      .asCallback(cb);
  }

  function deleteBook(data, cb) {
    knex('books')
      .del()
      .where('id', data.bookId)
      .asCallback(cb);
  }

  function insertAuthor(data, cb) {
    knex('authors')
      .insert({ firstname: data.firstname, lastname: data.lastname })
      .asCallback(cb);
  }

  function selectAuthors(cb) {
    knex('authors')
      .select('*')
      .asCallback(cb);
  }

  function selectAuthor(data, cb) {
    knex('authors')
      .select('*')
      .where('id', data.authorId)
      .first()
      .asCallback(cb);
  }

  function editAuthor(data, cb) {
    knex('authors')
      .update({ firstname: data.firstname, lastname: data.lastname })
      .where('id', data.authorId)
      .asCallback(cb);
  }

  function deleteAuthor(data, cb) {
    knex('authors')
      .del()
      .where('id', data.authorId)
      .asCallback(cb);
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
