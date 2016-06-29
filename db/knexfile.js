// configuration for knex
module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: __dirname + '/library_knex.db' },
    debug: true
  },
  production: {
    client: 'sqlite3',
    connection: { filename: __dirname + '/library_knex.db' }
  }
};
