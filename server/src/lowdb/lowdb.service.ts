import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

@Injectable()
export class LowdbService {
  private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDB();
  }

  private async initDB() {
    const adapter = new FileAsync('db.json');
    this.db = await lowdb(adapter);

    this.db
      .defaults({
        favorites: {},
      })
      .write();
  }

  async findByUser(userId: string) {
    return this.db.get('favorites').value()[userId];
  }

  async set(userId: string, books: number[]) {
    return this.db.get('favorites').set(userId, books).write();
  }
}
