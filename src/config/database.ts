export enum DBEnvironment {
  development = 'development',
  test = 'test',
}

interface DBEnvironmentVars {
  username: string;
  password: string;
  database: string;
  host: string;
  port: string | number;
  dialect: string;
}

export interface DBConfig {
  development: DBEnvironmentVars;
  test: DBEnvironmentVars;
}

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_DIALECT } =
  process.env;
const {
  DB_TEST_PORT,
  DB_TEST_HOST,
  DB_TEST_USERNAME,
  DB_TEST_PASSWORD,
  DB_TEST_NAME,
  DB_TEST_DIALECT,
} = process.env;

const dbConfig: DBConfig = {
  development: {
    username: DB_USERNAME || 'postgres',
    password: DB_PASSWORD || 'postgres',
    database: DB_NAME || 'postgres',
    host: DB_HOST || 'localhost',
    port: DB_PORT || 5440,
    dialect: DB_DIALECT || 'postgres',
  },
  test: {
    username: DB_TEST_USERNAME || 'postgres',
    password: DB_TEST_PASSWORD || 'postgres',
    database: DB_TEST_NAME || 'postgres',
    host: DB_TEST_HOST || 'localhost',
    port: DB_TEST_PORT || 5441,
    dialect: DB_TEST_DIALECT || 'postgres',
  },
};

module.exports = {
  development: dbConfig.development,
  test: dbConfig.test,
};
