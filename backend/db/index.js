const knex = require("knex");
const knexConfig = require("./knexfile");
require('dotenv').config({path:__dirname+'/../../.env.local'})


const environment = process.env.NODE_ENV;


module.exports = knex(knexConfig[environment]);
