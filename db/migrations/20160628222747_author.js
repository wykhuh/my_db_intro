exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('authors', function (table) {
      // primary key
      table.increments();
      // fields
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
    })
    .createTable('books', function (table) {
      // primary ke
      table.increments();
      // fields
      table.string('title').notNullable();
      table.integer('author_id').notNullable().references('id').inTable('authors');
    })
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('books')
    .dropTableIfExists('authors')
};
