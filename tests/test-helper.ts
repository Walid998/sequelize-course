/* eslint-disable @typescript-eslint/no-var-requires */
import '../src/config';
import { DB } from '../src/database';
const dbConfig = require('../src/config/database');

let db: DB;

export class testHelper {
  static async startDB() {
    db = new DB('test', dbConfig);
    return await db.connect();
  }

  static async stopDB() {
    const isConnected = await db.isConnected();
    if (db && isConnected) {
      await db.disconnect();
    }
  }
}
