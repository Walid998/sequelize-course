import '../src/config';
import { DB } from '../src/database';
import { dbConfig } from '../src/config/database';

let db: DB;

export class testHelper {
  static async startDB() {
    db = new DB('test', dbConfig);
    await db.connect();
    return db;
  }

  static async stopDB() {
    await db.disconnect();
  }

  static async syncDB() {
    await db.sync();
  }
}
