import cls from 'cls-hooked';
import { Options, Sequelize } from 'sequelize';
import  DBConfig  = require('../config/database');
import { ModelsRegistration } from '../models';

export class DB {
  environment: string;
  dbConfig: typeof DBConfig;
  isTestEnv: boolean;
  connection!: Sequelize;

  constructor(environment: string, dbConfig: typeof DBConfig) {
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
      (this.dbConfig as any)[this.environment];
    this.connection = new Sequelize({
      database,
      username,
      password,
      host,
      port,
      dialect,
      logging: this.isTestEnv ? false : console.log,
    });

    // verify database connection
    await this.connection.authenticate({ logging: false });
    
    // test environment
    if (this.isTestEnv)
      console.log('Connection to database established successfully!!');

    // register models
    ModelsRegistration.register(this.connection);

    // sync models
    this.sync();

    return this.connection;
  }

  async disconnect() {
    await this.connection?.close();
  }

  async isConnected() {
    try {
      await this.connection?.authenticate();
      return true;
    } catch (error) {
      return false;
    }
  }

  async sync() {
    // force is a suitable choise while testing, check the this link
    // https://sequelize.org/docs/v6/core-concepts/model-basics/
    try {
      await this.connection?.sync({
        logging: false,
        force: this.isTestEnv,
      });
    } catch (error) {
      console.log('Error syncing database:', error);
      throw error;
    }

    if (!this.isTestEnv) console.log('Connection Synced Successfully');
  }
}
