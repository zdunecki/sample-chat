const {promisify} = require('util');
const Joi = require('joi');
module.exports = {...Joi, validate: promisify(Joi.validate)};