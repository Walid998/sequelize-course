/* eslint-disable @typescript-eslint/no-var-requires */
import '../src/config';
import { DB } from '../src/database';
const dbConfig = require('../src/config/database');

let db: DB;

export class testHelper {
  static async startDB() {
    db = new DB('test', dbConfig);
    await db.connect();
    return db;
  }

  static async stopDB() {
    const isConnected = await db.isConnected();
    if (db && isConnected) {
      await db.disconnect();
    }
  }

  static async syncDB() {
    await db.sync();
  }
}
