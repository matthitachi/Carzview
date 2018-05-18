import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {
  dboptions = {
    name: "carsview.db",
    location: "default",
  };
  userTable = "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username CHAR(20), fname TEXT, lname TEXT, " +
    "email CHAR(50), role CHAR(20), phone TEXT, carid INTEGER REFERENCES cars(id), image TEXT, desc TEXT, password TEXT, trash INT, updated TEXT, created TEXT  )";


  carsTable = "CREATE TABLE IF NOT EXISTS cars(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, model TEXT, color TEXT, " +
    "plate_number CHAR(50), cost INT, worth INTEGER, image TEXT, desc TEXT, trash INT, updated TEXT, created TEXT  )";


  transactionTable = "CREATE TABLE IF NOT EXISTS transactions(id INTEGER PRIMARY KEY AUTOINCREMENT, car INTEGER REFERENCES cars(id), " +
    "user INTEGER REFERENCES users(id), amount INT, desc TEXT, trash INT, updated TEXT, created TEXT  )";

  dbTables: string[] = [this.carsTable, this.userTable, this.transactionTable];
  dataBaseObject: SQLiteObject;
  created = new Date().toLocaleString();
  updated = new Date().toLocaleString();

  constructor(public sqlite: SQLite) {
    console.log('Hello DbProvider Provider');
    this.getDB();
  }

  public getDB() {
    console.log("Database Created");
    this.sqlite.create(this.dboptions);
    this.sqlite.create(this.dboptions).then((db: SQLiteObject) => {
      this.dataBaseObject = db;
    });
  }

  public DeleteDB() {
    this.sqlite.deleteDatabase(this.dboptions).then((db) => {
      console.log(db);
    }).catch(e => console.log(e));
  }

  public createTable() {
    if (this.dataBaseObject)
      for (let i = 0; i < this.dbTables.length; i++) {
        this.dataBaseObject.executeSql(this.dbTables[i], {}).then(r => console.log("table " + i + " created")).catch(e => console.log(e));
      }
    console.log("Tables Created");

  }

  execQuery(query, options = {}) {
    if (this.dataBaseObject)
      return this.dataBaseObject.executeSql(query, options);

  }

  checkforTable() {
    let query = "SELECT name FROM sqlite_master WHERE type='table' AND name='users'";
    this.execQuery(query).then((res) => {
      console.log(JSON.stringify(res));
    });

  }

  DropTable(tablename) {
    let query = "Drop table ?";
    this.execQuery(query, [tablename]).then((res) => {
      console.log(JSON.stringify(res));
    });
  }
}
