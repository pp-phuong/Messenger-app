const path = require('path');
require('dotenv').config();

// eslint-disable-next-line no-console
console.log(process.env.DATABASE_URL);
const BASE_PATH = path.join(__dirname, 'src', 'database');
const pathMigration = path.join(__dirname, '/src/database/migrations');
module.exports = {
  development: {
    client: process.env.DB_CONNECTION,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: pathMigration,
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  // production: {
  //   client: process.env.DB_CONNECTION,
  //   connection: process.env.DATABASE_URL,
  //   migrations: {
  //     directory: path.join(BASE_PATH, 'migrations'),
  //   },
  //   seeds: {
  //     directory: path.join(BASE_PATH, 'seeds'),
  //   },
  //   pool: {
  //     min: parseInt(process.env.DB_POOL_MIN, 10),
  //     max: parseInt(process.env.DB_POOL_MAX, 10),
  //   },
  // },
};
