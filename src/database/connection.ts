/* eslint-disable @typescript-eslint/no-empty-function */
import cls from 'cls-hooked';
import { Options, Sequelize } from 'sequelize';
import { DBConfig, DBEnvironment } from '../config/database';

export class DB {
  environment: DBEnvironment;
  dbConfig: DBConfig;
  isTestEnv: boolean;
  connection: Sequelize | undefined;

  constructor(environment: DBEnvironment, dbConfig: DBConfig) {
    this.environment = environment;
    this.dbConfig = dbConfig;
    this.isTestEnv = this.environment === 'test';
  }

  async connect() {
    // Setup namespace for transactions
    // https://sequelize.org/docs/v6/other-topics/transactions/
    const namespace = cls.createNamespace('transactions-namespace');
    Sequelize.useCLS(namespace);

    // Create Database Connection
    const { username, password, database, host, port, dialect } =
      this.dbConfig[this.environment];
    this.connection = new Sequelize({
      database,
      username,
      password,
      host,
      port,
      dialect,
      logging: this.isTestEnv ? false : console.log,
    } as Options);

    // verify database connection
    await this.connection.authenticate({ logging: false });

    // test environment
    if (this.isTestEnv)
      console.log('Connection to database established successfully!!');

    // register models
    // registerModels(this.connection);

    // sync models
    this.sync();
  }

  async disconnect() {
    await this.connection?.close();
  }

  async sync() {
    // force is a suitable choise while testing, check the this link
    // https://sequelize.org/docs/v6/core-concepts/model-basics/
    await this.connection?.sync({
      logging: false,
      force: this.isTestEnv,
    });

    if (!this.isTestEnv) console.log('Connection Synced Successfully');
  }
}
