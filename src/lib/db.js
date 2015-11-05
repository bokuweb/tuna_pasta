import Dexie from 'dexie';

const db = new Dexie('Pasta');
let instance = null;

export default class DbManager {
  constructor() {
    if(!instance) {
      instance = this;
    }
    return instance;
  }

  create(schemes) {
    db.delete();
    db.version(1).stores(schemes);
    db.open();
  }

  put(table, doc) {
    return db[table].put(doc);
  }

  remove(table, key) {
    return db[table].delete(key);
  }

  getArray(table) {
    return new Promise((resolve, reject) => {
      db[table].toArray((docs) => {
        resolve(docs);
      });
    });
  }
}
