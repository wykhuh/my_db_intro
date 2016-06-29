var config = require('./knexfile.js');
var env = 'development';
// create an instance of knex using the configuration for an enviroment
var knex = require('knex')(config[env]);

module.exports = knex;
