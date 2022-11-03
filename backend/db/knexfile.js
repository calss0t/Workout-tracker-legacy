require('dotenv').config({path:__dirname+'/../../.env.local'})


module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
        directory: "./data/seeds"
      }
  },

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
        directory: "./data/migrations"
    },
    seeds: {
        directory: "./data/seeds"
    }
  }

  // client: "postgresql",
  // connection: process.env.DB_URL || {
  //   host: process.env.DB_HOST || "localhost",
  //   port: process.env.DB_PORT || 5432,
  //   database: process.env.DB_NAME,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  // },
  // migrations: {
  //   directory: "./data/migrations",
  // },
  // seeds: {
  //   directory: "./data/seeds",
  // },
};
