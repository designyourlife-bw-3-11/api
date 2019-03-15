// Update with your config settings.
const localPgConnection = {
  // placeholder since there is no pg locally
  host: "localhost",
  database: "dgn_life",
  user: "test",
  password: "pass"
};
const localPgConnectionTESTING = {
  host: "localhost",
  database: "dgn_life_testing",
  user: "test",
  password: "pass"
};

const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    // for pg
    client: "pg",
    connection: localPgConnection,
    // for sqlite:
    // client: "sqlite3",
    // connection: {
    //   filename: "./data/design-life.db3"
    // },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
    // useNullAsDefault: true // for sqlite
  },

  testing: {
    client: "pg",
    connection: localPgConnectionTESTING,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "postgresql",
    connection: prodDbConnection,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
