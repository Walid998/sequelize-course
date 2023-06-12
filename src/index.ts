import './config';
import { DB } from './database';
import { Environment } from './config/environment';
import dbConfig = require('./config/database');

async function start () {
  try {
    const db = new DB(Environment.nodeEnv, dbConfig);
    await db.connect();

  } catch (err: any) {
    console.log('Something went wrong while initialize the server\n', err.stack);
  }
}
start();
