const config = require('./config');
const knex = require('knex')(config[process.env.NODE_ENV || 'development']);

module.exports = knex;