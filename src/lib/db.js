import Dexie from 'dexie';

let instance = null;

export default class DbManager {
  constructor(name) {
    if(!instance) {
      this.db = new Dexie(name);
      instance = this;
    }
    return instance;
  }

  create(schemes) {
    //this.db.delete();
    this.db.version(1).stores(schemes);
    this.db.open();
  }

  put(table, doc) {
    return this.db[table].put(doc);
  }

  remove(table, key) {
    return this.db[table].delete(key);
  }

  getArray(table) {
    return new Promise((resolve, reject) => {
      this.db[table].toArray((docs) => {
        resolve(docs);
      });
    });
  }
}
